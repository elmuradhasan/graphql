require("reflect-metadata"); // Required for TypeORM
var typeorm = require("typeorm");
var User = require("../entity/User");

var AppDataSource = new typeorm.DataSource({
  type: "mongodb",
  url: "mongodb+srv://hsnlimurad540:murad580582@cluster0.ndwst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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
