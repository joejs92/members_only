const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

const messages = [
    {title: "Test", author: "Testy Testerson", messageText: "This is just a test to see if the messages will render."},
    {title: "Next Message Test", author: "Testicles Gloobiopolis", messageText: "This is a test to see if subsequent messages will render correctly."}
]

async function getHomePage(req, res){
    try {
        const { rows } = await pool.query("SELECT title, users.username, message FROM messages INNER JOIN users ON user_id = users.id;");
        res.render("index", {messages: rows});
      } catch(err) {
        console.log(err);
        //res.redirect("/");
      }
    //title: title, author: username, messageText: message
    //SELECT title, users.username, message FROM messages INNER JOIN users ON user_id = users.id;

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
    res.render("login");
}

async function getMembershipPage(req, res){
    res.render("membership");
}

async function getCreateMessagePage(req, res){
    res.render("message");
}

module.exports = {getHomePage, 
    getSignUpForm,
    postSignUpForm, 
    getLoginPage, 
    getMembershipPage, 
    getCreateMessagePage};