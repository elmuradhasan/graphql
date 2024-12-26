var bcrypt = require("bcryptjs");
const { GraphQLJSON } = require("graphql-scalars");
var jwt = require("jsonwebtoken");
var db = require("../models/index").db;
require('dotenv').config();
 module.exports = {
  JSON: GraphQLJSON,
  Query: {
    users: function () {
      var userRepository = db.getRepository("User");
      return userRepository.find();
    },
    movies: async () => {
      const movieRepository = db.getRepository("movies");
      return await movieRepository.find();
    },
    movie: async (_, { id }) => {
      const movieRepository = db.getRepository("movies");
      return await movieRepository.findOneBy({ id });
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const userRepository = db.getRepository("User");

      // Check if the user already exists
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        throw new Error("This user already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user object
      const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      await userRepository.save(newUser);

      // Generate a JWT token
      const token = jwt.sign(
        {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        process.env.SECRET, 
        { expiresIn: "1h" }
      );

      // Return the token and user object in AuthPayload format
      return {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      };
    },
    login: function (_, args) {
      const userRepository = db.getRepository("User");

      return userRepository.findOneBy({ email: args.email }).then((user) => {
        if (!user) {
          console.log("No user found with this email:", args.email);
          throw new Error("Invalid email or password"); // No user exists
        }
        return bcrypt
          .compare(String(args.password), String(user.password))
          .then((isValid) => {
            if (!isValid) {
              console.log("Password does not match for user:", args.email);
              throw new Error("Invalid email or password");
            }

            const token = jwt.sign({ userId: user.id },process.env.SECRET, {
              expiresIn: "1h",
            });

            return {
              token,
              user,
            };
          });
      });
    },

  },
};
