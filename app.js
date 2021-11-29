const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());


// IMPORT ROUTES
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const post1Route = require("./routes/post1");


// ROUTE MIDDLEWARE
app.use("/posts", postsRoute)
app.use("/api/user", authRoute);
app.use("/api/user/post1", post1Route);

// ROUTES
app.get("/posts", (req, res) => {
  res.send("We are on POST");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to mongodb")
});

// Listen
app.listen(3000, () => console.log("Server is up and running!"));