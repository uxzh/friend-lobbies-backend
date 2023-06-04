const express = require("express");
const route = express.Router();

route.get('/single/:id', (req, res, next) => {
    // return the information for a single user
})

route.put('/:id', (req, res, next) => {
    // update the details for a user
})

route.get('/username/:username', (req, res, next) => {
    // get user by username
})

route.get('/all', (req, res, next) => {
    // get all users, admin restricted
})

route.put('/ban/:id', (req, res, next) => {
    //ban a user (with duration of ban)
})

module.exports = route;