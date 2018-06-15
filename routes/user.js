const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  //get all users
  res.send('got our users')
});

userRouter.get('/:', (req, res, next) => {
  //get specific user
  res.send('got our specific user')
});

userRouter.post('/', (req, res, next) => {
  //post our user to db
  res.send('we post our user to db')
});

userRouter.put('/', (req, res, next) => {
  //update a user
  res.send('we update our user')
});

userRouter.delete('/', (req, res, next) => {
  //delete a user
  res.send('delete our user')
});

module.exports = userRouter;
