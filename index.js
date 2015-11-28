var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');
	hbs = require('hbs'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	config = require('./config.json'),
	User = require('./models/User.js');

var app = express();

app.set('views', __dirname + '/templates/views/');
app.set('view engine', 'hbs');

app.use(bodyParser());
app.use(cookieParser());
app.use(session({secret: 'baeMaxLoving'}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(__dirname + '/public'));
app.use("/client/build", express.static(__dirname + '/client/build'));


app.listen(config.PORT || 3000);


//**********************************

//ROUTING VIEWS

app.get("/", function (req, res) {
	console.log('/ GET');
	if (!req.user) {
		res.render('landingPage', {layout: "../layouts/main"});
	} else {
		res.render('index');
	}
});

app.get("/projects", function (req, res) {
	res.render('projects');
});

app.get("/people", function (req, res) {
	res.render("people");
});

app.get("/philosophy", function (req, res) {
	res.render("philosophy");
});

app.get("/freelance", function (req, res) {
	res.render("freelance");
});

app.get("/login", function (req, res) {
	res.render('login');
});

//***************



/// MONGOOOSE Database Linking ****

var mongoose = require('mongoose');

var connectDBLink = "mongodb://localhost/inde";


mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
	console.log("DB opened");
});

//***********************

/////PASSPORT Session///////////////

passport.use(new LocalStrategy({
		usernameField: "email",
		passwordField: "password"
	},
	function (email, password, done) {
		User.findOne({email: email}, function (err, user) {
			if (err) {return done(err);}
			if (!user) {
				console.log("Incorrect email");
       			return done(null, false, { message: 'Incorrect email.' });
      		}
      		if (!(user.password == password)) {
      			console.log("Incorrect password");
        		return done(null, false, { message: 'Incorrect password.' });
      		}
      		return done(null, user);	
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//*************************
