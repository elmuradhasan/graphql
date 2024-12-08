const { ApolloServer, gql } = require("apollo-server");

let users = [];
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
