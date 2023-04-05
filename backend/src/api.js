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

// Connecting to mongo
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    initializeRoutes();
  })
  .catch((err) => console.log(err));

function initializeRoutes() {
  const netlifyRoot = "/.netlify/functions";

  const apiRoot = process.env.NODE_ENV === "production" ? netlifyRoot : "";

  // routes
  app.use(`${apiRoot}/api/signin`, require("./routes/api/signin"));
  app.use(`${apiRoot}/api/login`, require("./routes/api/login"));
  app.use(`${apiRoot}/api/user`, require("./routes/api/user"));

  // Basic get rout
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send(
      `Super shopping list API see ${process.env.REPOSITORY_URL} for more info`
    );
  });

  app.use(`${apiRoot}/api/`, router);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API server listening on port http://localhost:${port}`);
  });
}

module.exports = app;
module.exports.handler = serverless(app);
