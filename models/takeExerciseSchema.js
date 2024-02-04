const mongoose = require("mongoose");

const takeExerciseSchema = new mongoose.Schema({
  student_id: {
    type: Array,
    require: true,
    default: null,
  },
  total_wrong: {
    type: Number,
    require: true,
    default: 0,
  },
  total_correct: {
    type: Number,
    require: true,
    default: 0,
  },
  answers: {
    type: Array,
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
  "takeExerciseSchema",
  takeExerciseSchema,
  "take exercise"
);
