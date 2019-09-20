const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.emailAddress = !isEmpty(data.Address) ? data.emailAddress : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";phone = !isEmpty(data.phone) ? data.phone : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = "Email field is required";
  }

  if (!Validator.isEmail(data.emailAddress)) {
    errors.emailAddress = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.mobileNo = "Mobile number is required";
  }
if(!Validator.matches(data.phone ,/[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)){
  errors.phone = "Enter correct phone number";
}

  return {
    errors,
    isValid: isEmpty(errors)
  };
};