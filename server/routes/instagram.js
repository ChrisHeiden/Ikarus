var express = require('express');
var router = express.Router();
var config = require('./config');

/* GET users listing. */
router.get('/', function(req, res, next) {

    const URL = 'https://graph.facebook.com/ig_hashtag_search?user_id=17841405309211844&q='

    fetch(URL)
        .then(data => {return data.json()})
        .then(res=>{console.log(res)});

/*
    function gotData(err, data, response)
    {
        tumblrRes = data;
        //for(let i = 0; i < tumblrRes.length; ++i)
        //{
        //console.log(tumblrRes[i].date);  
        //}
        res.json(tumblrRes);
    }*/
});

module.exports = router;

/*
GET graph.facebook.com/ig_hashtag_search
  ?user_id=17841405309211844
  &q=coke


  */