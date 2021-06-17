const express = require("express");
const ejs = require("ejs");
const app = require('express')();
const rp = require('request-promise');

// api setting
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '100',
    'convert': 'USD',
  },
  headers: {
    'X-CMC_PRO_API_KEY': '2ee07942-6750-4552-8b06-64d2f97a0076',
    'Accept': 'json'
  },
  json: true,
  gzip: true,
};

// app configurations 
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) =>{
    res.render('home')
})

// route to fetch all the responses 
app.get('/fetch/all', (req, res) =>{
    rp(requestOptions).then(response => {
        res.status(200).send(response)
      }).catch((err) => {
        console.log('API call error:', err.message);
        res.sendStatus(404)
      })
      })


// listen on port 
var PORT = process.env.PORT || 8000;
app.listen(PORT);