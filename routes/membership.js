const {Router} = require("express");
const controller = require("../controllers/controller")

const membership = Router();

membership.get("/", controller.getMembershipPage);
membership.post("/", controller.postMembershipPage);

//membership password: 12345;

module.exports = membership;