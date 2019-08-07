var express = require('express');
var router = express.Router();

var Twit = require('twit');
var config = require('./config');
var Data =  require('../routes/data')
var tagData = new Data();


/* GET users listing. */
router.get('/', function(req, res, next) {

  var T = new Twit(config);

  var param = 
  {
    q: tagData.getTag() + ' since:2011-07-11',
    count: 1000
  }   

  T.get('search/tweets', param, gotData);

  function gotData(err, data, response)
  {
    var tweet = data.statuses;
    res.json(tweet);
  }
});

module.exports = router;
