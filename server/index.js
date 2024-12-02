const { ApolloServer, gql } = require('apollo-server');

// Mock Data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// Schema Definition (typeDefs)
const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
  }
`;

// Resolver Functions
const resolvers = {
  Query: {
    users: () => users, // Return the mock users array
  },
};

// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Server
server.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});
