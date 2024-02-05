const express = require("express");
const router = express.Router();
const moduleSchema = require("../models/moduleSchema");
const mongoose = require("mongoose");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/cloudinary");

// create
router.post("/create", upload.single("icon"), async (req, res) => {
  try {
    // grab creds
    const { lesson, title, desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "An icon is required" });
    }

    icon = (await cloudinary.uploader.upload(req.file.path)).secure_url;

    const newModule = new moduleSchema({
      lesson,
      icon,
      title,
      icon,
      desc,
    });

    //   saved
    const savedModule = await newModule.save();

    return savedModule
      ? res
          .status(200)
          .json({ msg: "module created successfully", savedModule })
      : res.status(404).json({ msg: "failed to create module" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// all module
router.get("/all", async (req, res) => {
  try {
    // query
    const allModules = await moduleSchema.find();

    res.status(200).json({
      msg: "success",
      module_count: allModules.length,
      modules: allModules,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // grab user id
    const moduleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ msg: "module id not found" });
    }

    const delModule = await moduleSchema.findByIdAndDelete(moduleId);

    return delModule
      ? res
          .status(200)
          .json({ msg: "module deleted successfully", module: delModule })
      : res.status(404).json({ msg: "fialed to delete module" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// update module
router.put("/update/:id", upload.single("icon"), async (req, res) => {
  try {
    // grab user id
    const moduleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ msg: "module id not found" });
    }

    // grab creds
    const { lesson, title, desc } = req.body;

    const module = await moduleSchema.findOne({ _id: moduleId });

    const currentIcon = module.icon;

    const updatedIcon = await cloudinary.uploader.upload(req.file.path);

    const finalIcon = updatedIcon ? updatedIcon.secure_url : currentIcon;

    // update
    const updatedModule = await moduleSchema.updateOne(
      { _id: moduleId },
      { lesson, icon: finalIcon, title, desc }
    );

    return updatedModule.modifiedCount === 1
      ? res
          .status(200)
          .json({ msg: "module updated succesfully", updatedModule })
      : res.status(404).json({ msg: "failed to update module" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// complete module
router.put("/complete/:id", async (req, res) => {
  try {
    // grab user id
    const moduleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ msg: "module id not found" });
    }
    // update
    const completeModule = await moduleSchema.updateOne(
      { _id: moduleId },
      { isComplete: true }
    );

    return completeModule.modifiedCount === 1
      ? res
          .status(200)
          .json({ msg: "module completed succesfully", completeModule })
      : res.status(404).json({ msg: "module already completed " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});

// inComplete
router.put("/inComplete/:id", async (req, res) => {
  try {
    // grab user id
    const moduleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      return res.status(400).json({ msg: "module id not found" });
    }
    // update
    const inCompleteModule = await moduleSchema.updateOne(
      { _id: moduleId },
      { isComplete: false }
    );

    return inCompleteModule.modifiedCount === 1
      ? res.status(200).json({
          msg: "module Incompleted succesfully",
          completeModule: inCompleteModule,
        })
      : res.status(404).json({ msg: "module already incompleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = router;
