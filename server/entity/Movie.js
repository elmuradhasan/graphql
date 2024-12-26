const typeorm = require("typeorm");

const Movie = new typeorm.EntitySchema({
  name: "Movie",
  tableName: "movies",
  columns: {
    id: {
      primary: true,
      type: "objectId", // Correct type for MongoDB ObjectId
      objectId: true,
    },
    title: {
      type: "string",
      nullable: false,
    },
    plot: {
      type: "string",
      nullable: true,
    },
    genres: {
      type: "simple-array", // Stores arrays as comma-separated strings
      nullable: true,
    },
    runtime: {
      type: "int",
      nullable: true,
    },
    languages: {
      type: "simple-array",
      nullable: true,
    },
    released: {
      type: "date",
      nullable: true,
    },
    directors: {
      type: "simple-array",
      nullable: true,
    },
    writers: {
      type: "simple-array",
      nullable: true,
    },
    awards: {
      type: "simple-json", // Nested JSON or arrays
      nullable: true,
    },
    year: {
      type: "int",
      nullable: false,
    },
    rating: {
      type:"string",
      nullable: false,
    },
    countries: {
      type: "simple-array",
      nullable: true,
    },
    type: {
      type: "string",
      nullable: true,
    },
    tomatoes: {
      type: "simple-json",
      nullable: true,
    },
    poster: {
      type: "string",
      nullable: true,
    },
    fullplot: {
      type: "string", // Correct type for MongoDB strings
      nullable: true,
    },
    cast: {
      type: "simple-array",
      nullable: true,
    },
    num_mflix_comments: {
      type: "int",
      nullable: true,
    },
  },
});

module.exports = Movie;
