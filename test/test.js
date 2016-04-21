/* jshint expr:true */
/*
 {"email":"foo@bar.com", "password":"xxx"}
 */
var supertest = require('supertest');
var expect = require('chai').expect;

var server = supertest('http://localhost:3000/SITUsers');

describe('Server health response', function () {
  it('should return 200 OK', function (done) {
    server.get('/health')
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('OK');
        done();
      });
  });
});

describe('Sign up a user', function () {
  it('should return user email and id', function (done) {
    server.post('/')
      .send({'email': 'foo@bar.com', 'password': 'xxx'})
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.email).to.equal('foo@bar.com');
        expect(res.body.id).to.equal(1);
        done();
      });
  });
});

var token;

describe('Log in with the user 1', function () {
  it('should return a token for user 1', function (done) {
    server.post('/login')
      .send({'email': 'foo@bar.com', 'password': 'xxx'})
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.ttl).to.exist;
        expect(res.body.created).to.exist;
        expect(res.body.id).to.exist;
        token = res.body.id;
        expect(res.body.userId).to.equal(1);
        done();
      });
  });
});

describe('Get user 1', function () {
  it('should return email and id of user 1', function (done) {
    server.get('/1')
      .query('access_token='+token)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.email).to.exist;
        expect(res.body.email).to.equal('foo@bar.com');
        expect(res.body.id).to.exist;
        expect(res.body.id).to.equal(1);
        done();
      });
  });
});

/*
 describe('Get user 1', function () {
 it('should return email and id of user 1', function (done) {
 server.get('/Users/1')
 .query('access_token='+token)
 .end(function (err, res) {
 if (err) {
 throw err;
 }
 expect(res.statusCode).to.equal(200);
 expect(res.body.exists).to.exist;
 expect(res.body.exists).to.equal(true);
 done();
 });
 });
 });
 */
