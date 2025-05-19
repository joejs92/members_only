const {Router} = require("express");
const controller = require("../controllers/controller")

const login = Router();

login.get("/", controller.loginPage);

module.exports = login;