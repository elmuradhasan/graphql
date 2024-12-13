const typeorm = require("typeorm");

const User = new typeorm.EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "string", // Use "string" for MongoDB `_id` fields
      objectId: true, // Mark it as an ObjectId field
      generated: true,
    },
    username: {
      type: "string",
      nullable: false,
    },
    email: {
      type: "string",
      unique: true,
      nullable: false,
    },
    password: {
      type: "string",
      nullable: false,
    },
  },
});

module.exports = User;
