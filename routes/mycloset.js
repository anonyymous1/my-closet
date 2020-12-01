const express = require('express');
const mycloset = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

mycloset.get('/', (req, res) => {
    res.send('MYCLOSET PAGE')
    console.log("Arrived at MyCloset route");
})

module.exports = mycloset