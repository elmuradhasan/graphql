var typeorm = require("typeorm");

var User = new typeorm.EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "objectId",
      generated: true,
    },
    username: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
});

module.exports = User;
