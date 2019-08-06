var express = require('express');
var router = express.Router();
const app = express();
const axios = require('axios');

const Instagram = require('node-instagram').default;

const instagram = new Instagram({
    clientId: '13e2d7180fdb4095897aabd2bfe27241',
    clientSecret: '113bd378f4e84d8cb1adaf132f84a06c ',
    accessToken: '17678066803.62a4c0c.7c25eda8e753415282c88643d7a5e50b',
  });

/* GET users listing. */
router.get('/', function(req, res, next) {


    axios.get('https://api.instagram.com/v1/self/media/recent?access_token=17678066803.62a4c0c.7c25eda8e753415282c88643d7a5e50b')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {

    })
  
    
});

module.exports = router;



/*

 // You can use callbacks or promises
    // You can use callbacks or promises
    instagram.get('users/self', (err, data) => {
        if (err) {
        // an error occured
        console.log(err);
        } else {
        console.log(data);
        }
    });


      app.get('/auth/instagram', (req, res) => {
        res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
      });

      // Handle auth code and get access_token for user
        app.get('/auth/instagram/callback', async (req, res) => {
            try {
            const data = await instagram.authorizeUser(req.query.code, redirectUri);
            // Search for tags by name.
            instagram.get('tags/search', { q: 'climateChange' }).then(data => {
                console.log(data)
            });            
            } catch (err) {
            }
        });
*/