import { userMutation, userQuery } from "./user";
import { teamMutation, teamQuery } from "./team";

export default {
  Query: {
    ...userQuery,
    ...teamQuery,
  },
  Mutation: {
    ...userMutation,
    ...teamMutation,
  },
};
