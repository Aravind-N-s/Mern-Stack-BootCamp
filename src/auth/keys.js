require('dotenv').config();

module.exports = {
    mongo_URI: process.env.mongoURI,
    secretOrKey: process.env.SECRET
}