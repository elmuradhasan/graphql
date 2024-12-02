const { ApolloServer, gql } = require("apollo-server");

let users = [
  { id: 1, name: "Elmurad", email: "hsnlimurad36@gmail.com" },
  { id: 2, name: "Samil", email: "Samil@gmail.com" },
  { id: 3, name: "Sabir", email: "jkdjjj@gmail.com" },
  { id: 4, name: "Qasim", email: "hsnlimurad36@gmail.com" },
];
const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`;

// Resolver Functions
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = {
        id: users.length + 1, // Auto-generate an ID
        name,
        email,
      };
      users.push(newUser); // Add the new user to the mock array
      return newUser;
    },
  },
};

// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Server
server.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});
