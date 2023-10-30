require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const reportsRouter = require("./api/reports/router");
const authRouter = require("./api/auth/router");
const usersRouter = require("./api/users/router");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const {authenticateUser} = require("./middlewares/auth")

const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

app.use(cors(
  {
    origin : "*"
  }
));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.send("Hello World!");
});
app.use("/reports",authenticateUser, reportsRouter);
app.use("/auth", authRouter);
app.use("/users",authenticateUser, usersRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
  });
});
