import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      firstName
      email
      lastName
      userRole
      team {
        name
      }
    }
  }
`;
export const GET_TEAMS = gql`
  query getTeams {
    getTeams {
      id
      name
      users {
        id
        firstName
        lastName
        userRole
      }
    }
  }
`;
