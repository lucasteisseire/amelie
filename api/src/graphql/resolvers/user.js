import User from "../../models/User";
import hashPassword from "../../utils/hashPassword";
import generateToken from "../../utils/generateToken";
import bcrypt from "bcryptjs";
import {
  validateSignInInput,
  validateSignUpInput,
  validateRole,
  validateNewRoleInTeam,
  validateTeam,
} from "../../utils/validators";
import { UserInputError } from "apollo-server";

export const userQuery = {
  async getUsers() {
    try {
      const users = await User.find().populate("team");
      return users;
    } catch (e) {
      throw new Error(e);
    }
  },
};
export const userMutation = {
  async createUser(
    _,
    { userInput: { firstName, lastName, email, password, userRole } },
    ctx,
    info
  ) {
    const { valid, errors } = validateSignInInput(
      firstName,
      lastName,
      email,
      password
    );
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new UserInputError("Email is taken", {
        errors: {
          email: "This email is taken",
        },
      });
    }
    password = await hashPassword(password);
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      userRole,
    });
    const res = await newUser.save();
    const token = generateToken(res.id);
    return {
      ...res._doc,
      id: res._id,
      token,
    };
  },
  async updateUser(_, { updateUserInput }, ctx, info) {
    if (updateUserInput.password) {
      updateUserInput.password = await hashPassword(updateUserInput.password);
    }
    const currentUser = await User.findById(updateUserInput.userId);
    const { team } = await User.findById(updateUserInput.userId).populate({
      path: "team",
      populate: { path: "users" },
    });
    if (team && currentUser.userRole !== updateUserInput.userRole) {
      validateNewRoleInTeam(team, updateUserInput.userRole);
    }
    const user = await User.findByIdAndUpdate(
      updateUserInput.userId,
      { $set: { ...updateUserInput } },
      { new: true }
    );
    const res = await user.save();
    return res;
  },

  async login(_, { email, password }, ctx, info) {
    const { valid, errors } = validateSignUpInput(email, password);
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    const user = await User.findOne({ email });
    if (!user) {
      errors.general = "User not found";
      throw new UserInputError("User not found", {
        errors,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.general = "Wrong credentials";
      throw new UserInputError("Wrong crendentials", {
        errors,
      });
    }
    const token = generateToken(user._id);
    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },
};
