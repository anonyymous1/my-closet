const express = require('express');
const mycloset = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

mycloset.get('/', (req, res) => {
    const currentUser = res.locals.currentUser
    const alerts = res.locals.alerts
    db.sneaker.findAll().then (sneakers => {
        res.render('mycloset/mycloset', { alerts, currentUser, sneakers })
    })
})

module.exports = mycloset