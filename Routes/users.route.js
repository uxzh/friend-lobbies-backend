const express = require("express");
const userController = require("../controllers/userController");
const route = express.Router();

route.get('/single', userController.getSingle)

route.put('/:id', userController.update)

route.get('/username/:username', userController.getByUsername)

route.get('/all', userController.getAll)

route.put('/ban/:id', userController.ban)

route.put('/mute/:id/:lobby', userController.mute)

route.put('/save/:id', userController.saveLobby)

module.exports = route;