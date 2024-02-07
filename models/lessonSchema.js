const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  module_id: {
    type: String,
    require: true,
    default: null,
  },
  lesson: {
    type: String,
    require: true,
    default: null,
  },
  dateCreated: {
    type: Date,
    require: true,
    default: new Date(),
  },
  dateUpdated: {
    type: Date,
    require: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("lessonSchema", lessonSchema, "lessons");
