const {Router} = require("express");
const controller = require("../controllers/controller")

const message = Router();

message.get("/create-message", controller.createMessagePage);

module.exports = message;