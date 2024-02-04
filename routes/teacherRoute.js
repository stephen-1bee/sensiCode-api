const express = require("express");
const router = express.Router();
const teacherSchema = require("../models/teacherSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// create user
router.post("/create", async (req, res) => {
  try {
    // grab creds
    const { fullname, email, password, confirm_password, account_type } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const doesExist = await teacherSchema.findOne({ email });

    if (doesExist) {
      return res.status(400).json({ msg: `${email} already exist` });
    }

    // map creds
    const newTeacher = await teacherSchema({
      fullname,
      email,
      password: hashPassword,
      confirm_password,
      account_type,
    });

    //   save user
    const savedTeacher = await newTeacher.save();

    return savedTeacher
      ? res
          .status(200)
          .json({ msg: "teacher created successfully", teacher: savedTeacher })
      : res.status(404).json({ msg: "failed to create teacher" });
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await teacherSchema.findOne({ email });

    if (!teacher) {
      return res.status(401).json({ msg: "teacher email does not exist " });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    res.json({ msg: "login successful", user: teacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// all students
router.get("/all", async (req, res) => {
  try {
    // query
    const allTeachers = await teacherSchema.find();

    res
      .status(200)
      .json({ teacher_count: allTeachers.length, teacher: allTeachers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/one/:id", async (req, res) => {
  try {
    // grab user id
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ msg: "teacher id not found" });
    }

    const teacher = await teacherSchema.findOne({ _id: teacherId });

    return teacher
      ? res.status(200).json({ msg: "success", teacher })
      : res.status(404).json({ msg: "fialed to get student" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // grab user id
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ msg: "teacher id not found" });
    }

    const delTeacher = await teacherSchema.findByIdAndDelete(teacherId);

    return delTeacher
      ? res
          .status(200)
          .json({ msg: "teacher deleted successfully", teacher: delTeacher })
      : res.status(404).json({ msg: "fialed to delete student" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
