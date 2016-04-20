var request = require('request');
var expect = require('chai').expect;

describe('Server health response', function () {
  it('should return 200 OK', function (done) {
    request.get('http://localhost:3000/Users/health',
      function (err, res, body) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('OK');
        done();
      });
  });
});

/*describe('Sign up a user', function () {
  it('should return user email and id', function (done) {
    request.post('http://localhost:3000/Users',
      JSON.stringify({'email': 'foo@bar.baz', 'password': 'xxx'}))
      .end(function (err, res, body) {
        if (err) {
          throw err;
        }
        expect(res.statusCode).to.equal(200);
        expect(body.email).to.equal('foo@bar.baz');
        expect(body.id).to.equal(1);
        done();
      });
  });
});*/
