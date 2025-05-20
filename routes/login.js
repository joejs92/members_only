const {Router} = require("express");
const controller = require("../controllers/controller");
const passport = require("passport");

const login = Router();

login.get("/", controller.getLoginPage);
login.post("/", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/"
})); 

module.exports = login;