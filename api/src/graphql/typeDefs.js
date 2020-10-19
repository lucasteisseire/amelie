import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    email: String!
    token: String!
    password: String!
    createdAt: String!
    firstName: String!
    lastName: String!
    userRole: userRole!
    team: Team
  }
  type Team {
    id: ID!
    createdAt: String!
    name: String
    users: [User]!
  }
  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    userRole: userRole
  }
  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    userRole: userRole
    userId: String
  }

  enum userRole {
    SQUAD_LEADER
    SQUAD_MEMBER
    STAGIAIRE
  }
  type Query {
    getUsers: [User]
    getTeams: [Team]
  }
  type Mutation {
    createUser(userInput: UserInput): User!
    updateUser(updateUserInput: UpdateUserInput): User!
    login(email: String!, password: String!): User!
    createTeam(name: String!): Team!
    addUserToTeam(userId: String!, teamId: String!): Team!
  }
`;
