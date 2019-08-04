var express = require('express');
var tumblr = require('tumblr.js');
var router = express.Router();

var Twit = require('twit');
var config = require('./config');

/* GET users listing. */
router.get('/', function(req, res, next) {

    let tumblrRes;

    const client = tumblr.createClient({
        credentials: {
            consumer_key: 'mH85E3PedN8n8XluzYfynjryLpPzG7Y6LdtGqTRrCuwmERZV3q',
            consumer_secret: 'V4imWQtEQGkZeQDOKV9bwPq0Aa5wnA7XAJCZggYVQHgJBxuAzi',
            token: 'PGoFny6du63E6ttxSNdD27viCF50JgR73cBBERTiF5YW4XUgiT',
            token_secret: 'y3JeSSl7oZBME7AM7Gdv0ZD3y8AVW7PBf37bib2SSFELeBtyFO'},
        returnPromises: true,
    });


    // Make the request
    client.taggedPosts('climatechange', { limit: 100 }, gotData);


    function gotData(err, data, response)
    {
        tumblrRes = data;
        for(let i = 0; i < tumblrRes.length; ++i)
        {
        console.log(tumblrRes[i]);  
        }
        res.json(tumblrRes);
    }
});

module.exports = router;

/*

// Authenticate via API Key



Consumer Key 
Consumer Secret 
Token 
Token Secret 
API Key mH85E3PedN8n8XluzYfynjryLpPzG7Y6LdtGqTRrCuwmERZV3q
*/