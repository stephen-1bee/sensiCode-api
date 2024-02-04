const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    default: null,
  },
  desc: {
    type: String,
    require: true,
    default: null,
  },
  icon: {
    type: String,
    require: true,
    default: null,
  },
  lesson: {
    type: String,
    require: true,
    default: null,
  },
  isComplete: {
    type: Boolean,
    require: true,
    default: false,
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

module.exports = mongoose.model("moduleSchema", moduleSchema, "modules");
