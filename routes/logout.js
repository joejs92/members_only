const {Router} = require("express");
const controller = require("../controllers/controller");
const passport = require("passport");

const logout = Router();

logout.get("/", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

/* I just put all the logout stuff in here. There isn't much to it, and it's
just more convenient this way. It should be simple enough to move the meat
of the function into controllers if you really wanted to. In the future you
should make it so that a message appears when successfully logged out.
*/

module.exports = logout;