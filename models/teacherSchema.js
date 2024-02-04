const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
    default: true,
  },
  email: {
    type: String,
    require: true,
    default: true,
  },
  password: {
    type: String,
    require: true,
    default: true,
  },
  confirm_password: {
    type: String,
    require: true,
    default: true,
  },
  account_type: {
    type: String,
    require: true,
    default: true,
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

module.exports = mongoose.model("teacherSchema", teacherSchema, "teachers");
