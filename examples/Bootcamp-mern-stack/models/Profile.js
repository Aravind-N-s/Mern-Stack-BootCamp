const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-------Mongoose Schema Model-------//
//@schema types: String, Number, Array, Date
const ProfileSchema = new Schema({
  education: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  specilization: {
    type: String,
    required: true
  },
  cgpa:{
      type: Number
  },
  projects:{
      type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);