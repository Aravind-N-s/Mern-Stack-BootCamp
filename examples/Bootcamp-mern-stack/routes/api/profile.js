const mongoose = require("mongoose");
const express = require("express");

//Express meathods
const router = express.Router();
const logger = require("../../controller/logger");
const Profile = require("../../models/Profile");

// Load User Schema model
const User = require("../../models/Profile");


//@route /api/profile/
//@desc Get request to test the route
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

router.get("/details", function(req, res) {
  res.json({ msg: "Profile section  works" });
  logger.info("Profile log file in router");
  logger.error("Error at routing section");
});

module.exports = router;
