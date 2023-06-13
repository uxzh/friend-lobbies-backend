const express = require("express");
const lobbyController = require("../controllers/lobbyController");
const { lobbySchema } = require("../validation/schemas/lobby.schema");
const route = express.Router();
const { validateSchema }  = require("../validation/validateSchema");
const { multerUpload } = require("../lib/multerUpload");

route.get('/lobby/:id', lobbyController.getById)

route.get('/categories', lobbyController.getCategories)

route.post('/', validateSchema(lobbySchema), multerUpload.array('pictures', 5), lobbyController.addLobby)

route.put('/:id', lobbyController.edit)

route.delete('/:id', lobbyController.delete)

route.put('/join/:id', lobbyController.join)

route.put('/leave/:id', lobbyController.leave)

route.post('/messsage/:id', lobbyController.sendMessage)

route.get('/message/:id', lobbyController.getMessages)

module.exports = route;