const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({ extended: true });
const router = express.Router();

/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is not the main page' });
}); */

var entries = [];

router.get('/api/topics', parser, function (req, res) {
  try {
    var updtEntr = fs.readFileSync(__dirname+'/../jsondata/material.json');
    entries = JSON.parse(updtEntr);
    res.send(updtEntr)
  } catch (error) {
    entries = [];
    console.log(error)
    res.send('Could not find any entries on initial load: ')
    console.log('Could not find any entries on initial load')
  }
})

router.post('/api/topics', parser, function (req, res) {
  console.log('POST request received')
  try {
    var updtEntr = fs.readFileSync(__dirname+'/../jsondata/material.json')
    entries = JSON.parse(updtEntr);
  } catch {
    entries = [];
    console.log('No pre-existing data!')
  }

  let i = Object.keys(entries).length;
  req.body.id = i + 1;
  i++;
  const data = req.body
  entries.push(data)

  var entrJson = JSON.stringify(entries)

  fs.writeFileSync(__dirname+'/../jsondata/material.json', entrJson, function (err) {
    if (err) throw err;
  });

  var updtEntr2 = fs.readFileSync(__dirname+'/../jsondata/material.json')
  entries = JSON.parse(updtEntr2);
  res.send(entries)
  console.log('I updated material.json with a new entry');
  console.log('I updated {entries} -object with new data!');
})

module.exports = router;