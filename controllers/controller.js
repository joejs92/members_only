const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

async function getHomePage(req, res){
    try {
        const { rows } = await pool.query("SELECT messages.id, title, users.username, timestamp, message FROM messages INNER JOIN users ON user_id = users.id;");
        //console.log(rows);
        res.render("index", {messages: rows, user: req.user});
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
  //admins can only be created with direct DB manipulation!
  res.render("membership", {user: req.user});
}

async function postMembershipPage(req, res){
  //continue making this function work at least at a basic level.
  try {
    const {rows} = await pool.query("SELECT membershipstatus FROM membershipTable WHERE code = $1", [
      req.body.membershipCode
    ]);
    await pool.query("UPDATE users SET membership = $1 WHERE id = $2", [
      rows[0].membershipstatus,
      req.user.id
    ]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
    res.redirect("/");
  }
}

async function getCreateMessagePage(req, res){
    res.render("message", {user: req.user});
}

async function postCreateMessagePage(req, res){
  //title user_id timestamp message
 try {
  //YYYY-MM-DD HH:MN:SS
    const now = new Date();
    const dateString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    await pool.query("INSERT INTO messages (title, user_id, timestamp, message) VALUES ($1, $2, $3, $4)",[req.body.messageTitle, req.user.id, dateString, req.body.message]);
  } catch(err) {
    console.log(err);
  } 
  res.redirect("/");
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      /* if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" }); 
      currently set to check 'admin' membership. */
       const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
        //*for not-test data.*
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

async function deleteMessage(req, res) {
  //console.log(req.params.messageId);
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [req.params.messageId]);
  } catch(err) {
    console.log(err);
  }
  res.redirect("/");
}

/* What is in req.user. For reference
{
  id: 1,
  firstname: 'Testy',
  lastname: 'Testerson',
  username: 'TestMan',
  password: 'boogers',
  membership: 'user'
}
*/

module.exports = {getHomePage, 
    getSignUpForm,
    postSignUpForm, 
    getLoginPage, 
    getMembershipPage,
    postMembershipPage, 
    getCreateMessagePage,
    postCreateMessagePage,
    deleteMessage
  };