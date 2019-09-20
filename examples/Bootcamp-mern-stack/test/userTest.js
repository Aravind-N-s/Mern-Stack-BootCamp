const mongoose = require("mongoose");
const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

//------Checking the database-------//
describe("Users", () => {
  describe("/POST user", () => {
    it(
      "it should add the user",
      (async = done => {
        let user = {
          firstName: "Sai kumar",
          lastName: "Ch",
          username: "user",
          password: "pass"
        };
        chai
          .request(server)
          .post("/user")
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("errors");
            done();
          });
      })
    );

    it(
      "it should create a user ",
      (async = done => {
        let user = {
          firstName: "Sai kumar",
          lastName: "Ch",
          emailAddress: "sai@email.com",
          username: "me",
          password: "pass"
        };
        chai
          .request(server)
          .post("/user")
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("User successfully created");
            res.body.user.should.have.property("firstName");
            res.body.user.should.have.property("lastName");
            res.body.user.should.have.property("emailAddress");
            res.body.user.should.have.property("username");
            done();
          });
      })
    );
  });

  describe("/GET user", () => {
    it(
      "it should GET all the users",
      (async = done => {
        chai
          .request(server)
          .get("/user")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(0);
            done();
          });
      })
    );
  });

  describe("/PUT/:id user", () => {
    it("it should update a user given an id", done => {
      let user = new User({
        firstName: "Test user",
        lastName: "testing",
        emailAddress: "test12@email.com",
        username: "user",
        password: "pass"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/user/" + user.id)
          .send({
            firstName: "Test User2 ",
            lastName: "old",
            emailAddress: "test2@email.com",
            username: "user",
            password: "pass"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("User updated");
            res.body.user.should.have
              .property("emailAddress")
              .eql("test@xyz.com");
            done();
          });
      });
    });
  });

  describe("/DELETE/:id user", () => {
    it("it should delete a user given an id", done => {
      let user = new User({
        firstName: "Test user 3",
        lastName: "new",
        emailAddress: "test@mail.com",
        username: "user",
        password: "pass"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/user/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("User deleted");
            done();
          });
      });
    });
  });
});
