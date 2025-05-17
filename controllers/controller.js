//const home = require("../views/index");

async function check(req, res) {
    res.send("Works!");
}

async function homePage(req, res){
    res.render("index");
}

async function signUpForm(req, res){
    res.render("sign-up-form");
}

module.exports = {check, homePage, signUpForm};