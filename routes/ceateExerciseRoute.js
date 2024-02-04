const express = require("express");
const router = express.Router();
const createExerciseSchema = require("../models/createExerciseSchema");
const mongoose = require("mongoose");

// create
router.post("/create", async (req, res) => {
  try {
    // grab creds
    const { qa, module_id } = req.body;

    const newExercise = new createExerciseSchema({
      qa,
      module_id,
    });

    //   saved
    const savedExercise = await newExercise.save();

    return savedExercise
      ? res
          .status(200)
          .json({ msg: "exercise created successfully", savedExercise })
      : res.status(404).json({ msg: "failed to create exercise" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all module
router.get("/all", async (req, res) => {
  try {
    // query
    const allExercise = await createExerciseSchema.find();

    res.status(200).json({
      msg: "success",
      exercise_count: allExercise.length,
      exercise: allExercise,
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
      return res.status(400).json({ msg: "module id not found" });
    }

    const delExercise = await createExerciseSchema.findByIdAndDelete(
      exerciseId
    );

    return delExercise
      ? res
          .status(200)
          .json({ msg: "exercise deleted successfully", exercise: delExercise })
      : res.status(404).json({ msg: "fialed to delete module" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// // update module
// router.put("/update/:id", async (req, res) => {
//   try {
//     // grab user id
//     const moduleId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(moduleId)) {
//       return res.status(400).json({ msg: "module id not found" });
//     }

//     // grab creds
//     const { lesson, icons, title, icon, desc } = req.body;

//     // update
//     const updatedModule = await createExerciseSchema.updateOne(
//       { _id: moduleId },
//       { lesson, icons, title, icon, desc }
//     );

//     return updatedModule.modifiedCount === 1
//       ? res
//           .status(200)
//           .json({ msg: "module updated succesfully", updatedModule })
//       : res.status(404).json({ msg: "failed to update module" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "internal server error" });
//   }
// });

module.exports = router;
