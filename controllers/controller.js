//const home = require("../views/index");

async function check(req, res) {
    res.send("Works!");
}

async function homePage(req, res){
    res.send(home)
}

module.exports = {check};