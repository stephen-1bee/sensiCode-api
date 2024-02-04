const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// create user
router.post("/create", async (req, res) => {
  try {
    // grab creds
    const { fullname, email, password, confirm_password, account_type } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const doesExist = await userSchema.findOne({ email });

    if (doesExist) {
      return res.status(400).json({ msg: `${email} already exist` });
    }

    // map creds
    const newUser = await userSchema({
      fullname,
      email,
      password: hashPassword,
      confirm_password,
      account_type,
    });

    //   save user
    const savedUser = await newUser.save();

    return savedUser
      ? res
          .status(200)
          .json({ msg: "user created successfully", student: savedUser })
      : res.status(404).json({ msg: "failed to create user" });
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User email does not exist " });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    res.json({ msg: "login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// all students
router.get("/all", async (req, res) => {
  try {
    // query
    const allStudents = await userSchema.find();

    res
      .status(200)
      .json({ student_count: allStudents.length, students: allStudents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/one/:id", async (req, res) => {
  try {
    // grab user id
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ msg: "student id not found" });
    }

    const student = await userSchema.findOne({ _id: studentId });

    return student
      ? res.status(200).json({ msg: "success", student })
      : res.status(404).json({ msg: "fialed to get student" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // grab user id
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ msg: "student id not found" });
    }

    const delStudent = await userSchema.findByIdAndDelete(studentId);

    return delStudent
      ? res
          .status(200)
          .json({ msg: "student deleted successfully", student: delStudent })
      : res.status(404).json({ msg: "fialed to delete student" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
