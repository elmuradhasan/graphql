require("reflect-metadata"); // Required for TypeORM
var typeorm = require("typeorm");
var User = require("../entity/User");
require('dotenv').config();
var AppDataSource = new typeorm.DataSource({
  type: "mongodb",
  url: process.env.MONGODB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [User],
  synchronize: true, // Automatically sync database schema
  logging: false,
});

module.exports = {
  connectToDatabase: function () {
    return AppDataSource.initialize()
      .then(function () {
        console.log("Connected to MongoDB successfully!");
      })
      .catch(function (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
      });
  },
  db: AppDataSource,
};
