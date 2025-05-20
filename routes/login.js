const {Router} = require("express");
const controller = require("../controllers/controller")

const login = Router();

login.get("/", controller.getLoginPage);

module.exports = login;