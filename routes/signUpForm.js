const {Router} = require("express");
const controller = require("../controllers/controller")

const signUpForm = Router();

signUpForm.get("/sign-up", controller.signUpForm);

module.exports = signUpForm;