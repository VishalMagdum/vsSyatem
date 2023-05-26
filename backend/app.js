var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var user = require("./Routes/User");
var repos = require("./Routes/Repos")
var versions = require("./Routes/Version")
var Collabs = require("./Routes/Collabs")

var { getUser } = require("./Middleware/User")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/user", user);
app.use("/repos", getUser, repos);
app.use("/version", getUser, versions);
app.use("/collab", getUser, Collabs);

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://vishal:fQkQip0SHY0tbOOB@cluster0.kkulin0.mongodb.net/Docs");
    app.listen(process.env.PORT || 4000, () =>
      console.log("Listening on port 4000")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
