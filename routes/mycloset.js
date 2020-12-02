const express = require('express');
const mycloset = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

mycloset.get('/', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    db.sneaker.findAll().then (sneakers => {
        res.render('mycloset/mycloset', { alerts, currentUser, sneakers })
    })
})

mycloset.post('/:id', function(req, res) {
    let styleId = req.params.id;
    console.log(styleId);
    db.sneaker.destroy({ where: { styleId } })
    
    .then(() => {
        res.redirect('/mycloset');
    })
})

mycloset.get('/details/:styleId', (req,res) => {
    const styleId = req.params.styleId
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(`${styleId}`, function(err, sneaker){
        console.log(sneaker);
        res.render('details', {currentUser, alerts, sneaker})
    })
})


module.exports = mycloset