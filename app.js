const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const con = require("./utils/db");

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(morgan("dev"));
dotenv.config();

// route imports
const userRoute = require("./routes/userRoute");
const teacherRoute = require("./routes/teacherRoute");
const moduleRoute = require("./routes/moduleRoute");
const createExerciseRoute = require("./routes/ceateExerciseRoute");
const takeExerciseRoute = require("./routes/takeExerciseRoute");

// main
con();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/teachers", teacherRoute);
app.use("/api/v1/modules", moduleRoute);
app.use("/api/v1/createExercise", createExerciseRoute);
app.use("/api/v1/takeExercise", takeExerciseRoute);

port = process.env.PORT || 40;
app.listen(port, () => console.log(`listing on port ${port}`));
