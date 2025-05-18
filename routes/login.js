const {Router} = require("express");
const controller = require("../controllers/controller")

const login = Router();

login.get("/login", controller.loginPage);

module.exports = login;