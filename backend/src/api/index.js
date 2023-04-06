const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// Connecting to mongo
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const apiRoot = "/api";

// routes
app.use(`${apiRoot}/signin`, require("../routes/api/signin"));
app.use(`${apiRoot}/login`, require("../routes/api/login"));
app.use(`${apiRoot}/user`, require("../routes/api/user"));

// Basic get rout
const router = express.Router();

router.get(`${apiRoot}/`, (req, res) => {
  res.send(
    `Super shopping list API see ${process.env.PROJECT_REPOSITORY_URL} for more info`
  );
});

app.use(`${apiRoot}/`, router);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

module.exports = app;
// module.exports.handler = serverless(app);
