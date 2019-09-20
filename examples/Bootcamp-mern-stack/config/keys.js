require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.mongoURI,
  secretOrKey: process.env.SECRET
};