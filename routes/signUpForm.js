const {Router} = require("express");
const controller = require("../controllers/controller")

const signUpForm = Router();

signUpForm.get("/", controller.getSignUpForm);
signUpForm.post("/", controller.postSignUpForm);

module.exports = signUpForm;