var express = require('express');
var router = express.Router(),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../models/User.js');

/* GET /auth/ listing. */
router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', function(req, res, next) {
  res.send('respond with a resource');
});


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

module.exports = router;
