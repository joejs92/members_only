async function homePage(req, res){
    res.render("index");
}

async function signUpForm(req, res){
    res.render("sign-up-form");
}

async function loginPage(req, res){
    res.render("login");
}

async function membershipPage(req, res){
    res.render("membership");
}

async function createMessagePage(req, res){
    res.render("message");
}

module.exports = {homePage, 
    signUpForm, 
    loginPage, 
    membershipPage, 
    createMessagePage};