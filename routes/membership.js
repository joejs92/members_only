const {Router} = require("express");
const controller = require("../controllers/controller")

const membership = Router();

membership.get("/", controller.getMembershipPage);
membership.post("/", controller.postMembershipPage);

module.exports = membership;