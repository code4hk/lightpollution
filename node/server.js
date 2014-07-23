var flash = require('connect-flash');
var express = require('express'),
	path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BadRequestError = require('passport-local').BadRequestError;

var app = express();

var http = require('http'),
	path = require('path');


var serverSetup = require('./serverSetup');
// app.set('view engine', 'html');

app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);
app.use(express.errorHandler());
// app.engine('html', require('hbs').__express);
serverSetup.setupEnv(app);

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
	secret: 'keyboard cat'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);



var nStore = require('nstore');
// Create a store
var usersStore = nStore.new('data/users.db', function() {

	usersStore.save(null, {
		name: "vincent",
		age: 24
	}, function(err, key) {
		if (err) {
			throw err;
		}
		// The save is finished and written to disk safely
		console.log(key);
	});

	// Load the document with the key "creationix"
	// usersStore.get("1", function(err, doc, key) {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	// You now have the document
	// });
	// It's loaded now
});


var users = [{
	id: 1,
	username: 'admin',
	password: 'admin',
	email: 'bob@example.com'
}];

function findById(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function(err, user) {
		done(err, user);
	});
});



passport.use(new LocalStrategy(function(username, password, done) {
	process.nextTick(function() {
		console.log("try login" + username);
		findByUsername(username, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: 'Unknown user ' + username
				});
			}
			if (user.password != password) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			return done(null, user);
		})

	});

}));



// app.get('/template', function(req, res) {
// 	res.render('template', {
// 		output: '123',
// 		message: req.flash('info')
// 	});
// })
// app.get('/search', function(req, res) {
// 	res.render('fit', {
// 		output: '123',
// 		message: req.flash('info')
// 	});
// })

app.get('/', function(req, res) {
	res.render('main2', {
		output: '123',
		// message: req.flash('info'),
		error: req.flash('error')
	});
});

app.get('/index', function(req, res) {
	res.render('index', {
		output: '123'
	});
});

var crypto = require('crypto');

function sha1(data) {
	var generator = crypto.createHash('sha1');
	generator.update(data)
	return generator.digest('hex')
}

// function formString(queryStrings){
// for(i=0;i<queryStrings.length;i++){
// 	console.log(queryStrings[i]);
// }

// }
// toHash
var querystring = require('querystring');


var cloudinary = require('cloudinary');

app.get('/image/sign', function(req, res) {
	// var tstamp = new Date(req.query.tstamp);
	var timestamp = new Date().getTime();
	var tags = req.query.tags;
	console.log('req params');
	console.log(req.query);



	var cloudinary_cors = "http://" + req.headers.host + "/cloudinary_cors.html";
	var toHashObj = {};

	toHashObj.tags = tags;
	toHashObj.timestamp = timestamp;

	var SECRET = 'ezQs1aM7IVgY_bo77jAO65ArTuM';
	var toHash = querystring.stringify(toHashObj) + SECRET;
	var API_KEY = "992569542144213";
	var signature = sha1(toHash);

	console.log(toHash);

	var returnObject = {};
	//security concern, ccn put rubbish in params  
	returnObject.params = req.query;
	returnObject.timestamp = timestamp;
	returnObject.signature = signature;
	returnObject.callback = cloudinary_cors;
	returnObject.api_key = API_KEY;

	//shd not form my own obj. the cloudinaryData shd submit tgt with uplaod tag
	res.send(returnObject);
});
app.get('/about', function(req, res) {
	res.render('about',{});
});

app.post('/api/spot/add', function(req, res) {
	

});

app.get('/:path', function(req, res) {
	res.redirect('/#/' + req.params.path);
});

app.get('/:path/:sth', function(req, res) {
	res.redirect('/#/' + req.params.path+"/"+req.params.sth);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});