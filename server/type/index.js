const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User]
  }
  type User {
    id: ID!
    username: String!
    email: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(username: String!, email: String!, password: String!): AuthPayload!
    addUser(username: String!, email: String!, password: String!): User
  }
`;
module.exports = typeDefs;
