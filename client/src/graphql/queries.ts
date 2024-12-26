// src/graphql/queries.ts
import { gql } from "@apollo/client";

// Mutation to add a user
export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      name
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      title
      poster
      rating
    }
  }
`;