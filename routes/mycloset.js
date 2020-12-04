const express = require('express');
const mycloset = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const SneaksAPI = require('sneaks-api');
const isLoggedIn = require('../middleware/isLoggedIn');
const sneaks = new SneaksAPI();

// mycloset.get('/', isLoggedIn, (req, res) => {
//     const currentUser = res.locals.currentUser
//     console.log(`Current User is #${currentUser.id}`);
//     const alerts = res.locals.alerts
//     db.favorite.findAll({
//         where: { userId: currentUser.id },
//         include: [db.sneaker]
//     }).then (favorite => {
//         favorite.forEach(function(favorite){
//             console.log(favorite.sneakerId);
//         })
//         res.render('mycloset/mycloset', { alerts, currentUser, favorite })
//     })
// })

mycloset.get('/', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    console.log(`Current User is #${currentUser.id}`);
    const alerts = res.locals.alerts
    db.favorite.findAll({
        where: { userId: currentUser.id },
    }).then (favorite => {
        favorite.forEach(function(favorite){
            // console.log(favorite.sneakerId);
            db.sneaker.findAll({
                where: { styleId: favorite.sneakerId }
            }).then(favorite =>{
                // console.log(favorite);
                res.render('mycloset/mycloset', { alerts, currentUser, favorite})
            })
        })
    })
})

// mycloset.get('/', isLoggedIn, (req, res) => {
//     const currentUser = res.locals.currentUser
//     console.log(`Current User is #${currentUser.id}`);
//     const alerts = res.locals.alerts
//     db.favorite.findAll({
//         where: { userId: currentUser.id },
//     }).then (favorite => {
//         favorite.forEach(function(favorite){
//             console.log(favorite.sneakerId);
//         })
//         res.render('mycloset/mycloset', { alerts, currentUser, favorite })
//     })
// })

mycloset.post('/:id', function(req, res) {
    let styleId = req.params.id;
    db.favorite.destroy({ where: { sneakerId: styleId } })
    
    .then(() => {
        res.redirect('/mycloset');
    })
})

mycloset.get('/details/:styleId', isLoggedIn, (req,res) => {
    const styleId = req.params.styleId
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    sneaks.getProducts(`${styleId}`, function(err, sneaker){;
        res.render('details', {currentUser, alerts, sneaker})
    })
})


module.exports = mycloset