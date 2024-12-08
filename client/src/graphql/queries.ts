// src/graphql/queries.ts
import { gql } from "@apollo/client";

// Mutation to add a user
export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Query to get users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
