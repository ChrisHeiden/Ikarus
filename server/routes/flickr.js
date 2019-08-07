var express = require('express');
var router = express.Router();
const axios = require('axios');
var Data =  require('../routes/data')
var tagData = new Data();


let dataSet = [];

var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "061fec8f4fe3345cb146b8b6c0f85608",
      secret: "554d14d5178835d6"
    };

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    flickr.photos.search({
        tags: "climateChange"
      }, function(err, photoSet) {
        result = photoSet.photos.photo;
    });
});

/* GET users listing. */
router.get('/', function(req, res) {

    async function getGeneralData(){
        var result = [];
        await axios.get('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=061fec8f4fe3345cb146b8b6c0f85608&tags=' + tagData.getTag() + '&format=json&nojsoncallback=1')
        .then((response) => {
            let result = response.data.photos.photo;
        })
        .catch((err) => {
    
        })
        return result;
    }

    async function getSpecificData(result){
        var flickrSet = [];

        for(let i = 0; i < result.length; ++i)
        {
            axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=061fec8f4fe3345cb146b8b6c0f85608&photo_id=' + result[i].id + '&format=json&nojsoncallback=1')
            .then((response) => {
                flickrSet.push(response.photo);
            })
            .catch((err) => {

            })
        }
        return result;
    }
    
    
    getSpecificData(getGeneralData());
    res.json(result);       
});

module.exports = router;