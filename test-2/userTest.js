const jwt = require("jsonwebtoken");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../src/user/userModel");
const mongoose = require("mongoose");
const should = chai.should();
const expect = chai.expect();

const userData = {
  name: "Testuser1",
  email: "test@email.com",
  date: new Date(),
  password: "userpassword"
};
describe("User Model Test", () => {
  it("create & save user successfully", async () => {
    const validUser = new User(userData);
    const savedUser = validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

});
