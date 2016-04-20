module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/Users/health', function(req, res) {
    res.status(200).send('OK');
  });
  /*
  router.post('/Users/health' , function(req, res) {
    try{
      res.status(200).send('Hello'+req.body.email);
    }catch(e){
      console.log('sup');
      console.log(e);
    }
  });
  */
  server.use(router);
};
