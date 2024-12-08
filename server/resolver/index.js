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
    addUser: function (_, args) {
      const userRepository = db.getRepository("User");

      return bcrypt.hash(args.password, 10).then((hashedPassword) => {
        const newUser = userRepository.create({
          username: args.username,
          email: args.email,
          password: hashedPassword,
        });

        return userRepository.save(newUser).then(() => {
          return newUser; // Ensure the newUser object is returned
        });
      });
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
