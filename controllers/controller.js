async function homePage(req, res){
    res.render("index");
}

async function signUpForm(req, res){
    res.render("sign-up-form");
}

async function loginPage(req, res){
    res.render("login");
}

module.exports = {homePage, signUpForm, loginPage};