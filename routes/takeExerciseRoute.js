const express = require("express");
const router = express.Router();
const takeExerciseSchema = require("../models/takeExerciseSchema");
const mongoose = require("mongoose");

// create
router.post("/create", async (req, res) => {
  try {
    // grab creds
    const { user_id, total_wrong, total_correct, answers } = req.body;

    const newTakeExercise = new takeExerciseSchema({
      user_id,
      total_wrong,
      total_correct,
      answers,
    });

    //   saved
    const savedTakeExercise = await newTakeExercise.save();

    return savedTakeExercise
      ? res.status(200).json({
          msg: "exercise taked successfully",
          savedExercise: savedTakeExercise,
        })
      : res.status(404).json({ msg: "failed to take exercise" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all module
router.get("/all", async (req, res) => {
  try {
    // query
    const allTakenExercise = await takeExerciseSchema.find();

    res.status(200).json({
      msg: "success",
      take_exercise_count: allTakenExercise.length,
      exercise: allTakenExercise,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // grab user id
    const exerciseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({ msg: "taken Exercise id not found" });
    }

    const delExercise = await takeExerciseSchema.findByIdAndDelete(exerciseId);

    return delExercise
      ? res.status(200).json({
          msg: "exercise taken deleted successfully",
          exercise: delExercise,
        })
      : res.status(404).json({ msg: "fialed to delete exercise taken" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = router;
