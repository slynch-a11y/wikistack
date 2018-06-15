var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var layout = require('./views/layout.js')
var morgan = require('morgan');
const models = require('./models');

// models.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))

const init = async() => {
  await models.db.sync({force: true});
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

init();

app.get('/', (req, res, next) => {
  res.send(layout("Hello!"));
});

