const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const logger = require('../../controller/logger');

// Load User Schema model
const User = require("../../models/User");

//Importing Validations
const validateRegisterInput = require("../../validation/register");

//----------Creating the functions for routers-------//
module.exports.createTest = function(req, res) {
  res.json({ msg: "User works" });
};

//----- Standard mongoose QUERIES-------//

//@curd Operations : Create
module.exports.createUser = function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //----Populate ---------//
  User.findOne({ emailAddress: req.body.emailAddress })
    .populate("user", "emailAddress")
    .then(user => {
      if (user) {
        errors.emailAddress = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User(req.body);
        newUser.save((err, user) => {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: "User successfully created", user });
          }
        });
      }
    });
};

//@Read the data in DB
module.exports.getUsers = function(req, res) {
  let query = User.find({});
  query.exec((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

//@Update the data
module.exports.updateUser = function(req, res) {
  User.findById({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    Object.assign(user, req.body).save((err, user) => {
      if (err) res.send(err);
      res.json({ message: "User updated", user });
    });
  });
};
//@Delete the data
module.exports.deleteUser = function(req, res) {
  User.remove({ _id: req.params.id }, (err, result) => {
    res.json({ message: "User deleted", result });
  });
};

//Express  applications
// @route   /api/user/....
// @desc    Router for CURD operations
// @access  Public
router.get("/create", this.createTest);
router.post("/user", this.createUser);
router.get("/user", this.getUsers);
router.put("/user/:id", this.updateUser);
router.delete("/user/:id", this.deleteUser);


module.exports = router;
