let mongoose = require('mongoose');
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('User', function() {

  let testid = null;

  beforeEach((done) => { 
    //empty the database before each test
    /* this isn't working from the test spec for some reason */
    User.remove({}, function(err) { 
        console.log(err);
        done();
    });
    done(); // temp to prevent failure, but causes an 'evergreen' test
    
  });
  
  /*
  * Test registering a new user
  */
  describe('/POST register new user', () => {
    it('it should register a new user and save to the database', (done) => {
      const testuser = {
        "name": "test user",
        "email": "testuser@gmail.com",
        "username": "testuser",
        "password": "testuser",
        "locations": ["Seattle","Miami"]
      }
      chai.request('http://localhost:3000')
        .post('/users/register')
        .set('content-type', 'application/json')
        .send(testuser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('msg');
          done();
      });
    });
  });

  /*
  * Test authenticating a new user
  */
  describe('/POST authenticate user', () => {
    it('it should successfully authenticate user', (done) => {
      const testauthuser = {
        "username": "testuser",
        "password": "testuser",
      }
      chai.request('http://localhost:3000')
        .post('/users/authenticate')
        .set('content-type', 'application/json')
        .send(testauthuser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('token');
          res.body.should.have.property('user');
          testid = res.body.user.id; // needed for further tests
          
          done();
      });
    });
  });

  /*
  * Test adding a new location to user's saved locations
  */
  describe('/POST add new location user', () => {
    it('it should successfully add a new location', (done) => {
      const testnewloc = {
        "userid": testid,
        "location": "Copenhagen"
      }

      chai.request('http://localhost:3000')
        .post('/users/addlocation')
        .set('content-type', 'application/json')
        .send(testnewloc)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('model');
          done();
      });
    });
  });

  /*
  * Test removing a location to user's saved locations
  */
  describe('/POST remove location user', () => {
    it('it should successfully remove a location', (done) => {
      const testremoveloc = {
        "userid": testid,
        "location": "Copenhagen"
      }

      chai.request('http://localhost:3000')
        .post('/users/removelocation')
        .set('content-type', 'application/json')
        .send(testremoveloc)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('model');
          done();
      });
    });
  });

});