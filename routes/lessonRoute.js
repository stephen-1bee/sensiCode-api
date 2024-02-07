const express = require("express");
const mongoose = require("mongoose");
const lessonSchema = require("../models/lessonSchema");
const router = express.Router();

// create
router.post("/create", async (req, res) => {
  try {
    const { module_id, lesson } = req.body;

    const newLesson = new lessonSchema({
      module_id,
      lesson,
    });

    const savedLesson = await newLesson.save();

    return savedLesson
      ? res
          .status(200)
          .json({ msg: "lesson created successfully", savedLesson })
      : res.status(404).json({ msg: "failed to create lesson" });
  } catch (err) {
    console.log(err);
  }
});

// lesson by module
router.get("/module/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ msg: "lesson id not found" });
    }

    const lesson = await lessonSchema.find({ _id: lessonId });

    return lesson
      ? res.status(200).json({ msg: "success", lesson })
      : res.status(404).json({ msg: "failed to fetch lessons by module" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allLessons = await lessonSchema.find();

    res.json({ allLessons });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ msg: "lesson id not found" });
    }

    const delLesson = await lessonSchema.findByIdAndDelete(lessonId);

    return delLesson
      ? res.status(200).json({ msg: "lesson deleted successfully" })
      : res.status(404).json({ msg: "failed to delete lesson" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
