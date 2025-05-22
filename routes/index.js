const {Router} = require("express");
const controller = require("../controllers/controller")
//const {home} = require("../views/index");

const index = Router();

index.get("/", controller.getHomePage);
index.post("/:messageId", controller.deleteMessage);

module.exports = index;