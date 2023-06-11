const express = require("express");
const signupController = require("../controllers/signupController");
const { multerUpload } = require("../lib/multerUpload");
const { validateSchema } = require('../validation/validateSchema')
const route = express.Router();
const {signupSchema} = require('../validation/schemas/signup.schema.js') 

route.post('/', multerUpload.single('picture'), validateSchema(signupSchema), signupController.signupCheck, signupController.signup)

module.exports = route;