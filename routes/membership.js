const {Router} = require("express");
const controller = require("../controllers/controller")

const membership = Router();

membership.get("/", controller.membershipPage);

module.exports = membership;