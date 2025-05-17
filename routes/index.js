const {Router} = require("express");
const controller = require("../controllers/controller")
//const {home} = require("../views/index");

const index = Router();

index.get("/", controller.check);

module.exports = index;