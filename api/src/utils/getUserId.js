import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
export const getUserId = (context) => {
  const auth = context.req.headers.authorization;
  if (auth) {
    const token = auth.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid or experied token");
      }
    }
    throw new Error("Authentication must be Bearer token");
  }
  throw new Error("Authentication must be provided");
};
