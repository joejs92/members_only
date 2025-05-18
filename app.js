const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const index = require("./routes/index");
const signUpForm = require("./routes/signUpForm");
const login = require("./routes/login");
const membership = require("./routes/membership");
const message = require("./routes/message");
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public'))); //included for directing to the CSS file. See the 'public' folder.

app.get("/", index);
app.get("/sign-up", signUpForm);
app.get("/login", login);
app.get("/membership", membership);
app.get("/create-message", message);

app.listen(3000, () => console.log("app listening on port 3000!"));