const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const users = require("./src/user/userRoutes");
const profile = require("./src/profile/profileRoutes");

const app = express();

//------------Body parser middleware----------//
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));

//--------Call Back Functions -----------//
app.use(bodyParser.json());

// Database configuration
const db = require("./src/auth/keys").mongo_URI;

//--------Connect to MongoDB-----------//
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected successfully"))
  .catch(err => console.log(err));

//------------Passport middleware----------//
app.use(passport.initialize());

// Passport Config
require("./src/auth/passport")(passport);

//----------@ROUTER app.mountpath()---------//
app.use("/users", users);
app.use("/profile", profile);

//serve static assets if the app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //set static foler
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//----------Running through a port---------//
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
