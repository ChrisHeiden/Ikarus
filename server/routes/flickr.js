var express = require('express');
var router = express.Router();
const axios = require('axios');
var Data =  require('../routes/data')
var tagData = new Data();


let dataSet = [];
/* GET users listing. */
router.get('/', function(req, res) {

    async function getGeneralData(){
        var result;
        result = await axios.get('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=061fec8f4fe3345cb146b8b6c0f85608&tags=' + tagData.getTag() + '&format=json&nojsoncallback=1')
        return result;
    }

    async function getSpecificData(result){
        var flickrSet = [];

        for (const item of result) {
            axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=061fec8f4fe3345cb146b8b6c0f85608&photo_id=' + item.id + '&format=json&nojsoncallback=1')
            .then((response) => {
                flickrSet.push(response.data.photo);
            })
        }
        return flickrSet;
    }
    
    
    let result = getGeneralData();
    result.then((response) => {
        result = response.data.photos.photo;
        const flickrSet = getSpecificData(result);
        res.json(result);       
    })
});

module.exports = router;