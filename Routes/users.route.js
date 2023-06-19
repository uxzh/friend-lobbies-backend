const express = require("express");
const userController = require("../controllers/userController");
const { inviteSchema } = require("../validation/schemas/invite.schema");
const { validateSchema } = require('../validation/validateSchema');
const { userUpdateSchema } = require("../validation/schemas/userUpdate.schema");
const { multerUpload } = require("../lib/multerUpload");
const route = express.Router();
const adminCheck = require("../lib/adminCheck");

route.get('/single', userController.getSingle)

route.put('/:id', multerUpload.single('picture'), validateSchema(userUpdateSchema), userController.update)

route.get('/username/:username', userController.getByUsername)

route.get('/all', adminCheck, userController.getAll)

route.put('/ban/:id', adminCheck, userController.ban)

route.put('/mute/:id/:lobby', userController.mute)

route.put('/save/:id', userController.saveLobby)

route.put('/unsave/:id', userController.unsaveLobby)

route.put('/removeFriend/:id', userController.removeFriend)

route.put('/addInvite/:id',validateSchema(inviteSchema), userController.addInvite)

route.put('/removeInvite/:id', userController.removeInvite)

route.put('/acceptInvite/:id', userController.acceptInvite)

module.exports = route;