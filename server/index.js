var ApolloServer = require("apollo-server").ApolloServer;
var typeDefs = require("./type/index");
var resolvers = require("./resolver/index");
var connectToDatabase = require("./models/index").connectToDatabase;

connectToDatabase().then(function () {
  var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function ({ req }) {
      var token = req.headers.authorization || "";
      var user = null;

      if (token) {
        try {
          user = jwt.verify(token.replace("Bearer ", ""), "your_secret_key");
        } catch (err) {
          console.error("Invalid token", err);
        }
      }

      return { user: user };
    },
  });

  server.listen().then(function ({ url }) {
    console.log("GraphQL server is running at " + url);
  });
});
