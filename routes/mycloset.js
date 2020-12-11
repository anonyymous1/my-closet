const express = require('express');
const mycloset = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const isLoggedIn = require('../middleware/isLoggedIn');

mycloset.get('/', isLoggedIn, (req, res) => {
    const currentUser = res.locals.currentUser
    console.log(`Current User is #${currentUser.id}`);
    const alerts = res.locals.alerts
    db.favorite.findAll({
        where: { userId: currentUser.id },
        include: [db.sneaker]
    }).then (favorites => {
        favorites.forEach(function(favorite){
            console.log(favorite);
        })
        res.render('mycloset/mycloset', { alerts, currentUser, favorites })
    })
})

mycloset.post('/:id', function(req, res) {
    let styleId = req.params.id;
    // console.log(styleId);
    db.favorite.destroy({ where: { sneakerId: styleId } })
    
    .then(() => {
        res.redirect('/mycloset');
        // res.send('mycloset');
    })
})

mycloset.get('/details/:styleId', isLoggedIn, (req,res) => {
    const styleId = req.params.styleId
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    Axios.get(`http://sneaks-testing.herokuapp.com/home?styleID=${styleId}`).then((response)=>{
        // console.log(response.data);
        const sneaker = response.data
        res.render('details', {currentUser, alerts, sneaker})
    })
})


module.exports = mycloset