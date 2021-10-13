const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const router = express.Router();
const URL = 'https://api.publicapis.org/entries';

router.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/items', async function(req, res) {
  axios.get(URL)
    .then((items) => {
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(items.data));
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      console.log('api call finished');
    })  
});

app.use('/', router);
app.listen(process.env.port || 3000);