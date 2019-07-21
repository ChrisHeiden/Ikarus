var express = require('express');
var router = express.Router();

var Twit = require('twit');
var config = require('./config');

/* GET users listing. */
router.get('/', function(req, res, next) {

  var T = new Twit(config);

  var param = 
  {
    q: 'climatechange since:2011-07-11',
    count: 1000
  }   

  T.get('search/tweets', param, gotData);

  function gotData(err, data, response)
  {
    var tweet = data.statuses;
    //for(let i = 0; i < tweet.length; ++i)
    //{
    //    console.log(tweet[i].user.location);
    //}

    res.json(tweet);
  }
});

module.exports = router;