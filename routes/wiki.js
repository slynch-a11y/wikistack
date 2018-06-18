const express = require('express');
const wikiRouter = express.Router();
const addPage = require('../views/addPage');
const {Page, User} = require('../models');
const {editPage, main, userList, userPages} = require('../views');
const wikipage = require('../views/wikipage');


wikiRouter.get('/', async(req, res, next) => {
  //retreive all key pages
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  }
  catch (error){
    next(error);
  }
  });

wikiRouter.post('/', async(req, res, next) => {
  //submit a new page to the database
  console.log('req.body', req.body);
  //res.json(req.body)
  //basically, we need:
  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content
  // });
  //since we have our parameters defined in our html:
  const page = new Page(req.body);

  try {
    const [user, wasCreated] = await User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }});
    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  }
  catch(error){
    next(error);
  }
});

wikiRouter.get('/add', (req, res, next) => {
  //retrieve the add a page form
  res.send(addPage());
});

// wikiRouter.get('/:slug', (req, res, next) => {
//   res.send(`hit dynamic route at ${req.params.slug}`);
// });
wikiRouter.get('/:slug', async(req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if (page === null){
      res.sendStatus(404);
    }
    const author = await page.getAuthor();
    res.send(wikipage(page, author));


  }
  catch (error){
    next(error);
  }
});

wikiRouter.post('/:slug', async(req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    })
    res.redirect(`/wiki/${updatedPages[0].slug}`);
  }
  catch (error){
    next(error);
  }
});

wikiRouter.get('/:slug/delete', async(req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });
    res.redirect('/wiki');
  }
  catch (error){
    next(error);
  }
});

wikiRouter.get('/:slug/edit', async(req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if (page === null){
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  }
  catch (error){
    next(error);
  }
});

module.exports = wikiRouter;
