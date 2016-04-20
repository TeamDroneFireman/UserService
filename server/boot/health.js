module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/SITUsers/health', function(req, res) {
    res.status(200).send({status:'OK'});
  });
  server.use(router);
};
