const mongoose = require("mongoose");

const createExerciseSchema = new mongoose.Schema({
  qa: {
    type: Array,
    require: true,
    default: null,
  },
  module_id: {
    type: String,
    require: true,
    default: null,
  },
  dateUpdated: {
    type: Date,
    require: true,
    default: new Date(),
  },
  dateCreated: {
    type: Date,
    require: true,
    default: new Date(),
  },
});
module.exports = mongoose.model(
  "createExerciseSchema",
  createExerciseSchema,
  "create exercise"
);
