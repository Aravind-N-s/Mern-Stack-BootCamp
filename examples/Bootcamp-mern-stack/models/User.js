const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-------Mongoose Schema Model-------//
//@schema types: String, Number, Array, Date
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
      type: Number
  },
  bio:{
      type:String
  },
  skills:{
      type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//------Encrypting the password using Bcrypt-js-------
UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = User = mongoose.model('users', UserSchema);