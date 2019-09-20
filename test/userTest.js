const mongoose = require("mongoose");
const User = require("../src/user/userModel");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const user = require("../src/user/userRoutes");
chai.use(chaiHttp);

//------Checking the database-------//
describe("Users", async =  () => {
  describe("/POST user", () => {
    it("it should not create a user without email address", done => {
      let user = {
        name: "TEST1",
        email: "test@gmail.com",
        password: "pasghsdvjss"
      };
      chai
        .request(server)
        .post("/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.email.should.have.property("kind").eql("required");
          done();
        });
    });

    it("it should create a user ", done => {
      let user = {
        name: "test2",
        email: "test@email.com",
        password: "pass"
      };
      chai
        .request(server)
        .post("/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("User successfully created");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("password");
          done();
        });
    });
  });

  describe("/GET user", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/all")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/PUT/:id user", () => {
    it("it should update a user given an id", done => {
      let user = new User({
        name: "train user",
        email: "trail@email.com",
        password: "passdvcshds"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/user/" + user.id)
          .send({
            name: "test3",
            email: "testing@email.com",
            password: "pasdsjcgss"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("User updated");
            res.body.user.should.have.property("email").eql("trail@email.com");
            done();
          });
      });
    });
  });

  describe("/DELETE/:id user", () => {
    it("it should delete a user given an id", done => {
      let user = new User({
        name: "olduser",
        emailAddress: "login@email.com",
        password: "passsdkjbsd"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/user" )
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
