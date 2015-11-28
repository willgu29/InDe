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


// AWS File System

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

app.get('/sign_s3', function(req, res){
    console.log("Query: ", req.query.file_name, req.query.file_type, S3_BUCKET);
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var urlKey = req.user._id+'/'+req.query.file_name;
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: urlKey,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
                console.log("PUT OBJECT");
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.user._id+'/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();

        }
    });
});

app.post('/api/media/:userID', function(req, res){
    console.log("/api/media/:userID POST " + req.params.userID);

    var userID;
    if (req.params.userID == "me") {
      userID = req.user._id;
    } else {
      userID = req.params.userID;
    }

    var parts = req.body.mediaLink.split('.');
    var extension = parts[parts.length-1];

    var mediaType;
    console.log("parts: " + parts);
    console.log("extension : " + extension);
    if (extension == "wav" || extension == "mp3" || extension == "aiff") {
      mediaType = "AUDIO";
    } else {
      mediaType = "UNDETERMINED";
    }

    var newMedia =new Media({ user_id: userID, 
                              mediaType: mediaType,
                              mediaLink: req.body.mediaLink,
                              extensionType: extension,
                              displayOnProfile: true });


    newMedia.save(function (err, newMedia) {
                if (err) {
                  console.error(err);
                  return res.send("There was an error in saving your media. Please try again in a minute.");
                } else {
                  console.log(newMedia);
                  var htmlLazyMe = "<p>Media saved! This content will now be displayed on your user profile for others to see!</p>" + "<a href=/editAccount>Back</a>";
                  return res.send(htmlLazyMe);
                }
    });

    // res.json('Response 200');
});

//************************
