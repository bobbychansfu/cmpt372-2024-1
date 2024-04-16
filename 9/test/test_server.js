var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
  it ('should list ALL users on /users-api GET', function(done) {
    chai.request(server)
      .get('/users-api')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      })
  })

  it ('should add a SINGLE user on /users-api POST', function(done) {
    chai.request(server)
      .post('/users-api')
      .send({'fname': 'John', 'lname': 'Doe'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('fname');
        res.body[0].should.have.property('lname');
        res.body[0].fname.should.equal('John');
        res.body[0].lname.should.equal('Doe');
        done();
      })
  })

  it ('should delete a SINGLE user on /users-api/:fname DELETE', function(done) {
    chai.request(server)
      .delete('/users-api/John')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(0);
        done();
      })
  })

  it ('should return "You are logged in" on /login POST', function(done) {
    chai.request(server)
      .post('/login')
      .send({'username': 'admin', 'password': 'password'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.equal('You are logged in');
        res.should.have.cookie('n_session');
        done();
      })
  })
})
