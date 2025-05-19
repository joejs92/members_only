const {Router} = require("express");
const controller = require("../controllers/controller")

const message = Router();

message.get("/", controller.createMessagePage);

module.exports = message;