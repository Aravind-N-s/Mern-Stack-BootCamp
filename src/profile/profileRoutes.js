const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();

const {
  profileTest,
  getCurrentProfile,
  getOnly,
  deleteProfile
} = require("./profileController");

// @route   GE/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", profileTest);

// @route   GET /profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCurrentProfile
);

// @route   GET /profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", getOnly);

// @route   DELETE /profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteProfile
);

module.exports = router;
