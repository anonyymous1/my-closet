const express = require('express');
const browse = express.Router();
const db = require('../models');
const flash = require('connect-flash');
const passport = require('../config/ppConfig');
const app = express();

app.use(flash());

app.use((req, res, next)=> {
  // before every route, we will attach a user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})


browse.get('/', (req, res) => {
    res.send('BROWSE PAGE')
    console.log("Arrived at Browse route");
})

browse.get('/mostPopular', (req, res) => {
    console.log(res.locals.alerts);
    res.render('browse/mostPopular', { alerts: res.locals.alerts})
    console.log("Arrived at Most Popular route");
        // sneaks.getMostPopular(function(err, products){
        // console.log(products)
        // })
})

browse.get('/search', (req, res) => {
    res.send('SEARCH PAGE')
    console.log("Arrived at Search route");
})

module.exports = browse