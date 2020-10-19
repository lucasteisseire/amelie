import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      name
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      firstName
      lastName
      email
      userRole
      team {
        name
      }
      id
    }
  }
`;
export const ADD_USER_TO_TEAM = gql`
  mutation addUserToTeam($userId: String!, $teamId: String!) {
    addUserToTeam(userId: $userId, teamId: $teamId) {
      name
    }
  }
`;
