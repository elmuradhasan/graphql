var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var db = require("../models/index").db;

var SECRET = "your_secret_key"; // Replace with a secure secret

module.exports = {
  Query: {
    users: function () {
      var userRepository = db.getRepository("User");
      return userRepository.find();
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
        "your_secret_key", // Replace with a strong secret key
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

            const token = jwt.sign({ userId: user.id }, SECRET, {
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
