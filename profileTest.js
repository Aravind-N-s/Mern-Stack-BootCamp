const jwt = require("jsonwebtoken");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const User = require("./src/user/userModel");
const mongoose = require("mongoose");
const should = chai.should();

const user1 = {
  name: "new user1",
  email: "user1@test.com",
  password: "qwertyuiop"
};

const user2 = {
  name: "new user2",
  email: "user2@test.com",
  password: "qwertyuiop"
};

chai.use(chaiHttp);

before(done => {
  User.create(
    [user1, user2],
    (async = (err, users) => {
      if (err) return done();
      mongoUser1 = users[0];
      mongoUser2 = users[1];
      const { id: id1 } = mongoUser1;
      userToken1 = jwt.sign({ id: id1 }, process.env.JWT_SECRET);
      const { id: id2 } = mongoUser2;
      userToken2 = jwt.sign({ id: id2 }, process.env.JWT_SECRET);
      done();
    })
  );
});
describe("Login User", () => {
  it("it should allow user to login successfully", done => {
    // payload to be sent in request body
    const payload = { name: "test", email: "test@gm.com", password: "121313" };

    chai
      .request(server)
      .post("/login")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User Already Loggedin ");
        done();
      });
  });

  it("it should return error if token is invalid", done => {
    chai
      .request(server)
      .post("/current")
      .send({ token: "invalidToken" })
      .end((err, res) => {
        res.should.have.status(HttpStatus.FORBIDDEN);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Token Invalid");
        done();
      });
  });

  it("it should login user", done => {
    // email from oauth response
    const payload = { email: "user1@test.com", password: "sbbdsksdsd" };

    chai
      .request(server)
      .post("/login")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User Already Registered");
        done();
      });
  });

  it("it should register user", done => {
    // email from oauth response
    const payload = {
      email: "old@test.com",
      name: "old user",
      password: "qwertyuiop",
      password2: "qwertyuiop"
    };

    chai
      .request(server)
      .post("/register")
      .send(payload)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User Registered Successfully");
        done();
      });
  });
});

describe("Update Profile", () => {
  it("it should update user profile", done => {
    // payload to be send as request body
    const payload = {
      name: "ytuteuwy"
    };

    chai
      .request(server)
      .post(`/update/${userToken1}`)
      .send(payload)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Profile Updated Successfully");
        done();
      });
  });
});

describe("Retrieve MongoDB Id from token", () => {
  it("it should fetch mongo Id from token", done => {
    chai
      .request(server)
      .get(`/user/id/${userToken1}`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have.property("payload");
        res.body.payload.should.have.property("id").eql(mongoUser1.id);
        done();
      });
  });
});

describe("Check User Exists", () => {
  it("it should have user", done => {
    chai
      .request(server)
      .get(`/user/find/${user1.email}/email`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User Found");
        done();
      });
  });
});

after(done => {
  User.deleteOne({ email: user1.email }, err => {});
  User.deleteOne({ email: user2.email }, err => {});
  User.deleteOne({ email: "dummy@test.com" }, err => {});

  done();
});
