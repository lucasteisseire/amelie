import Team from "../../models/Team";
import User from "../../models/User";
import { getUserId } from "../../utils/getUserId";
import { validateTeam, validateNewRoleInTeam } from "../../utils/validators";
export const teamQuery = {
  async getTeams() {
    try {
      const teams = await Team.find().populate("users").exec();
      return teams;
    } catch (e) {
      throw new Error(e);
    }
  },
};
export const teamMutation = {
  async createTeam(_, { name }, ctx, info) {
    const newTeam = new Team({
      name,
    });
    const res = await newTeam.save();
    return {
      ...res._doc,
      id: res._id,
    };
  },
  async addUserToTeam(_, { userId, teamId }, ctx, info) {
    try {
      const user = await User.findById(userId).populate("team");
      const userAlreadyInteam = await Team.exists({ users: userId });
      const team = await Team.findById(teamId).populate("users");
      validateNewRoleInTeam(team, user.userRole);

      if (userAlreadyInteam) {
        throw new Error("user already in this team");
      }
      const validate = validateTeam(team);
      if (!user) {
        throw new Error("user not existing he cant be add to this team");
      }
      if (!team) {
        throw new Error("team not existing");
      }
      if (user && team && validate) {
        user.team = team;
        team.users.push(user._id);
        team.save();
        user.save();
      }
      return team;
    } catch (err) {
      throw new Error(err);
    }
  },
};
