const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();

const {
  checkConn,
  createUser,
  loginUser,
  getallUsers,
  getUser,
  updateUser,
  deleteUser
} = require("./userController");

//----------ROUTER request Meathods-------------//

// @route   GET users/test
// @desc    Check the connection
// @access  Public
router.get("/test", checkConn);
// @route   POST users/register
// @desc    Register a new user
// @access  Public
router.post("/register", createUser);

// @route   POST users/login
// @desc    Login user and GENEREATE token/session
// @access  Private
router.post("/login", loginUser);

// @route   GET users/current
// @desc    FETCH the document of the current session
// @access  Private
router.post(
  "/cuurent",
  passport.authenticate("jwt", { session: false }),
  getUser
);

// @route   GET users/all
// @desc    Returns json file of all users
// @access  Public
router.get("/all", getallUsers);

// @route   PUT users/update/:id
// @desc    Updates the particular credentials
// @access  Private
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

// @route   DELETE users/user/
// @desc    Deletes the user from DB
// @access  Private
router.delete(
  "/user",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
