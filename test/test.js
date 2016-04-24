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

var user;

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
        expect(res.body.id).to.exist;
        user = res.body.id;
        done();
      });
  });
});

var token;

describe('Log in with the user', function () {
  it('should return a token for user', function (done) {
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
        expect(res.body.userId).to.equal(user);
        done();
      });
  });
});

describe('Get user', function () {
  it('should return email and id of user', function (done) {
    server.get('/'+user)
      .query('access_token='+token)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.email).to.exist;
        expect(res.body.email).to.equal('foo@bar.com');
        expect(res.body.id).to.equal(user);
        done();
      });
  });
});

describe('Check authentication of user', function () {
  it('should return 200 code and token info', function (done) {
    server.get('/'+user+'/accessTokens/'+token)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body.userId).to.equal(1);
        expect(res.body.id).to.equal(token);
        done();
      });
  });
});

describe('Logout user', function () {
  it('should return 204 code and no body', function (done) {
    server.post('/logout')
      .query('access_token='+token)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.equal('');
        done();
      });
  });
});

describe('Check authentication of user after logout', function () {
  it('should return 404 code and error', function (done) {
    server.get('/'+user+'/accessTokens/'+token)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.exist;
        done();
      });
  });
});
