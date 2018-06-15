const express = require('express');
const wikiRouter = express.Router();
const addPage = require('../views/addPage');

wikiRouter.get('/', (req, res, next) => {
  //retreive all key pages
  res.send('gpt to GET /wiki/')
})
wikiRouter.post('/', (req, res, next) => {
  //submit a new page to the database
  console.log('req.body', req.body);
  res.send('gpt to POST /wiki/')
})
wikiRouter.get('/add', (req, res, next) => {
  //retrieve the add a page form
  res.send(addPage());
});

module.exports = wikiRouter;
