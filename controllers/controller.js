const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

async function getHomePage(req, res){
    try {
        const { rows } = await pool.query("SELECT title, users.username, message FROM messages INNER JOIN users ON user_id = users.id;");
        res.render("index", {messages: rows});
      } catch(err) {
        console.log(err);
      }
}

async function getSignUpForm(req, res){
    res.render("sign-up-form");
}

async function postSignUpForm(req, res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query("INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, $5)", [
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          hashedPassword,
          "user"
        ]);
        res.redirect("/");
      } catch(err) {
        console.log(err);
        res.redirect("/");
      }
}

async function getLoginPage(req, res){
    res.render("login", {user: req.user});
}

async function getMembershipPage(req, res){
    res.render("membership");
}

async function getCreateMessagePage(req, res){
    res.render("message");
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = {getHomePage, 
    getSignUpForm,
    postSignUpForm, 
    getLoginPage, 
    getMembershipPage, 
    getCreateMessagePage};