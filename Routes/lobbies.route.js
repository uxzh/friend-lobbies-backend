const express = require("express");
const route = express.Router();

route.get('/lobby/:id', (req, res, next) => {
    // get lobby by id
})

route.get('/categories', (req, res, next) => {
    // get all possible categories
})

route.post('/', (req, res, next) => {
    //add a lobby
})

route.put('/:id', (req, res, next) => {
    // edit a lobby
})

route.delete('/:id', (req, res, next) => {
    //delete a lobby
})

route.put('/join/:id', (req, res, next) => {
    // join a lobby
})

route.put('/leave/:id', (req, res, next) => {
    // leave a lobby
})

route.post('/messsage/:id', (req, res, next) => {
    //post a message in a lobby
})

route.get('/message/:id', (req, res, next) => {
    //get messages from a lobby
})

module.exports = route;