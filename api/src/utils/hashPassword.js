import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error(
      `Your password must be 8 characters or longer, it has ${password.length}`
    );
  }
  return bcrypt.hash(password, 12);
};

export { hashPassword as default };
