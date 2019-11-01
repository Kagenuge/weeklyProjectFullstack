var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/topics', function (req, res, next) {
  dbService.getAllUsers(results => {
    res.json(results);
  });
});

router.get('/api/topics/:id', function (req, res, next) {
  dbService.getUserById(req.params.id, results => {
    res.json(results);
  });
});

router.post('/api/topics', function(req,res){
  dbService.createUser(req, results => {
    res.json(results);
  });
});

router.delete('/api/topics/:id', function (req, res, next) {
  dbService.deleteUser(req, results => {
    res.json(results);
  });
});

router.put('/api/topics/:id', function (req, res, next) {
  dbService.updateUser(req, results => {
    res.json(results);
  });
});

module.exports = router;