const express = require("express");
const sigupController = require("../controllers/signupController");
const route = express.Router();

route.post('/', sigupController.signup)


module.exports = route;