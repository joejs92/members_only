const messages = [
    {title: "Test", author: "Testy Testerson", messageText: "This is just a test to see if the messages will render."},
    {title: "Next Message Test", author: "Testicles Gloobiopolis", messageText: "This is a test to see if subsequent messages will render correctly."}
]

async function homePage(req, res){
    res.render("index", {messages: messages});
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