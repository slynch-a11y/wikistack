var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const {db} = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

app.get('/', (req, res, next) => {
  res.send('Hello this works!')
});

