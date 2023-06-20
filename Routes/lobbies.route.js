const express = require("express");
const lobbyController = require("../controllers/lobbyController");
const { lobbySchema } = require("../validation/schemas/lobby.schema");
const route = express.Router();
const { validateSchema }  = require("../validation/validateSchema");
const { multerUpload } = require("../lib/multerUpload");
const { editLobbySchema } = require("../validation/schemas/editLobby.schema");

route.get('/lobby/:id', lobbyController.getById)

route.get('/categories', lobbyController.getCategories)

route.post('/', validateSchema(lobbySchema), multerUpload.array('pictures', 5), lobbyController.addLobby)

route.put('/:id',validateSchema(editLobbySchema), multerUpload.array('pictures', 5), lobbyController.editLobby)

route.delete('/:id', lobbyController.delete)

route.put('/join/:id', lobbyController.join)

route.put('/leave/:id', lobbyController.leave)

route.post('/messsage/:id', lobbyController.sendMessage)

route.get('/message/:id', lobbyController.getMessages)

route.put('/addAdmin/:id/:lobby', lobbyController.addAdmin)

route.put('/removeAdmin/:id/:lobby', lobbyController.removeAdmin)

route.put('/kick/:id/:lobby', lobbyController.kick)

route.put('/wait/:id', lobbyController.wait)

route.put('/unwait/:id', lobbyController.unwait)

route.get('/search/', lobbyController.search)

route.get('users/:id', lobbyController.getUsers)

module.exports = route;