const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("dotenv").config();

// Load Validation
const validateProfileInput = require("../auth/validation/profile");

// Load Profile Model
const Profile = require("./profileModel");
// Load User Model
const User = require("../user/userModel");

//-----------FUNCTIONS_---------//
profileTest = (req, res) => {
  //@DESC   Router Responses res.(....)
  res.json({ msg: "Profile section works" });
};
getCurrentProfile = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

getOnly = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
};

deleteProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
};

module.exports = {
  profileTest,
  getCurrentProfile,
  getOnly,
  deleteProfile
};
