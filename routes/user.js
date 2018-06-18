const express = require('express');
const userRouter = express.Router();
const addPage = require('../views/addPage');
const {Page, User} = require('../models');
const {editPage, main, userList, userPages} = require('../views');
const wikipage = require('../views/wikipage');

userRouter.get('/', async(req, res, next) => {
  //get all users
  try {
    const users = await User.findAll();
    res.send(userList(users))
  }
  catch (error){
    next(error);
  }

});

userRouter.get('/:userId', async(req, res, next) => {
  //get specific user
  try {
    const user = await User.findById(req.params.userId);
    // const pages = await Page.findAll({
    //   where: {
    //     authorId: req.params.userId
    //   }
    // });
    if (user === null){
      res.sendStatus(404);
    }
    const pages = await user.getPages();
    res.send(userPages(user, pages));
  }
  catch(error){
    next(error);
  }

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
