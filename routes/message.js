const {Router} = require("express");
const controller = require("../controllers/controller")

const message = Router();

message.get("/", controller.getCreateMessagePage);
message.post("/", controller.postCreateMessagePage);

module.exports = message;