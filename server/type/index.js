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
  sendEmail(name: String!, email: String!, message: String!): String
}

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(username: String!, email: String!, password: String!): AuthPayload!
    addUser(username: String!, email: String!, password: String!): User
  }
    scalar JSON

  type Movie {
    id: ID
    plot: String
    rating:String
    genres: [String]
    runtime: Int
    cast: [String]
    num_mflix_comments: Int
    poster: String
    title: String
    fullplot: String
    languages: [String]
    released: String
    directors: [String]
    writers: [String]
    awards: JSON
    lastupdated: String
    year: Int
    imdb: JSON
    countries: [String]
    type: String
    tomatoes: JSON
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }
`;
module.exports = typeDefs;
