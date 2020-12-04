const express = require('express');
const browse = express.Router();
const db = require('../models');
const SneaksAPI = require('sneaks-api');
const isLoggedIn = require('../middleware/isLoggedIn');
const sneaks = new SneaksAPI();


browse.get('/', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    res.render('browse/browse', { alerts, currentUser })
})

browse.get('/mostPopular', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getMostPopular(function(err, products){
    const product = products
    res.render('browse/mostPopular', { alerts, currentUser, product })
    })
})


browse.post('/mostPopular', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    let brand = req.body.brand;
    let shoeName = req.body.shoeName;
    let styleID = req.body.styleID;
    let thumbnail = req.body.thumbnail;
    db.sneaker.findOrCreate({
        where: {
            shoeName: shoeName,
            brand: brand,
            styleId: styleID,
            thumbnail: thumbnail
        }
        }).then(([sneaker, created]) =>{
            db.favorite.findOrCreate({
                where: {
                    userId: req.user.id,
                    sneakerId: styleID
                }
            }).then(()=>{
            res.redirect('/browse/mostPopular')
        })
    })
})

browse.get('/searchTerm', isLoggedIn,(req, res) => {
    const searchTerm = req.query.searchTerm;
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(`${searchTerm}`, function(err, products){
        const product = products
        res.render('browse/search', { alerts, currentUser, product })
    })
})

browse.get('/search', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(``, function(err, products){
        const product = products
    res.render('browse/search', { alerts, currentUser, product })
    })
})

browse.get('/details/:styleId', isLoggedIn,(req,res) => {
    const styleId = req.params.styleId
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(`${styleId}`, function(err, sneaker){
        res.render('details', {currentUser, alerts, sneaker})
    })
})

module.exports = browse

