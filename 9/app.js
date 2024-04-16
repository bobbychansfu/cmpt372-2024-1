var express = require("express");
var cors = require("cors"); // cross-origin resource sharing
var session = require("express-session");

var app = express();

var users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(session({
    name: 'n_session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use("/", cors());

app.get("/users-api", function(req, res) {
    res.json(users);
})

app.post("/users-api", function(req, res) {
    users.push(req.body);
    res.json(users);
})

app.delete("/users-api/:fname", function(req, res) {
    let fname = req.params.fname
    users = users.filter(function(user) {
        return user.fname !== fname;
    })
    res.json(users);
})

app.post("/login", function(req, res) {
    if (req.body.username === "admin" && req.body.password === "password") {
        req.session.authenticated = true;
        res.send("You are logged in");
    } else {
        res.send("Incorrect login");
    }
})

app.listen(3000);
console.log("Express app running on port 3000");

module.exports = app;
