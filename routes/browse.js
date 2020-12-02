const express = require('express');
const browse = express.Router();
const db = require('../models');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


browse.get('/', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    res.render('browse/browse', { alerts, currentUser })
})

browse.get('/mostPopular', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getMostPopular(function(err, products){
    const product = products
    res.render('browse/mostPopular', { alerts, currentUser, product })
    })
})

browse.post('/mostPopular', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    let brand = req.body.brand;
    let shoeName = req.body.shoeName;
    let styleID = req.body.styleID;
    let thumbnail = req.body.thumbnail;
    db.sneaker.findOrCreate({
        where: {shoeName: shoeName},
        defaults : {
            shoeName: shoeName,
            brand: brand,
            styleId: styleID,
            thumbnail: thumbnail}
        })
    res.redirect('/browse/mostPopular')
    })

browse.get('/searchTerm', (req, res) => {
    const searchTerm = req.query.searchTerm;
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(`${searchTerm}`, function(err, products){
        const product = products
        res.render('browse/search', { alerts, currentUser, product })
    })
})

browse.get('/search', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(``, function(err, products){
        const product = products
    res.render('browse/search', { alerts, currentUser, product })
    })
})

module.exports = browse

