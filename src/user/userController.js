const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../auth/keys");
require("dotenv").config();
const User = require("./userModel");

//Validation 
// Load Input Validation
const validateRegisterInput = require("../auth/validation/register");
const validateLoginInput = require("../auth/validation/login");

//-----------FUNCTIONS_---------//
checkConn = (req, res) => {
  //@DESC   Router Responses res.(....)
  res.json({ msg: "User route works successfully" });
};

//@DESC Register the new user
createUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //--------static Meathods-----//
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //---------Encryption using bcrypt-JS---------//
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

//Login the user and create JWT session token
loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //--------Check Validation------------//
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //@desc:  Find user by email from documents
  //-------------Static meathods-----------//
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        //----------Sign Token and session timeout-----------------//
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: process.env.EXPIRE_TIME },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

//@desc GET current active user--------//
getUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

//@desc : Get all users from the database
//----------Instance meathods-------------//
getallUsers = (req, res) => {
  let query = User.find({});
  query.exec((err, users) => {
    if (err) {
      res.send("Error Occured in fetching documents");
    } else {
      res.json(users);
    }
  });
};

//@desc: update user info in database
updateUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    Object.assign(user, req.body).save((err, user) => {
      if (err) res.send(err);
      res.json({ message: "User updated", user });
    });
  });
};

//@desc : delete user info from database
deleteUser = function(req, res) {
  User.findByIdAndRemove({ _id: req.user.id }, (err, result) => {
    res.json({ message: "User deleted", result });
  });
};

module.exports = {
  checkConn,
  createUser,
  loginUser,
  getallUsers,
  getUser,
  updateUser,
  deleteUser
};
