const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

//---Importing the routes-------
const user = require("./routes/api/user");
const profile = require("./routes/api/profile");

const app = express();

//------Initialize session-------//
app.use(session({ secret: "ssshhhhh" }));
var sess;
app.get("/", function(req, res) {
  sess = req.session;
  sess.emailAddress;
  sess.username;
});

//------- Body parser middleware--------//
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose DB connection
const db = require("./config/keys").MONGO_URI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

//------ Passport middleware-------
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/user", user);
app.use("/api/profile", profile);

//-------serve static assets if the app in production----------//
//-----------Custom Configuration---------//
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //set static foler
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Initializing the port
const port = process.env.PORT || 5000;

//------Running a server using express.listen() meathod-------//
app.listen(port, () => console.log(`Server running on port ${port}`));
