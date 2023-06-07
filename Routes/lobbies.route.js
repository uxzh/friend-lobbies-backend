const express = require("express");
const lobbyController = require("../controllers/lobbyController");
const route = express.Router();

route.get('/lobby/:id', lobbyController.getById)

route.get('/categories', lobbyController.getCategories)

route.post('/', lobbyController.addLobby)

route.put('/:id', lobbyController.edit)

route.delete('/:id', lobbyController.delete)

route.put('/join/:id', lobbyController.join)

route.put('/leave/:id', lobbyController.leave)

route.post('/messsage/:id', lobbyController.sendMessage)

route.get('/message/:id', lobbyController.getMessages)

module.exports = route;