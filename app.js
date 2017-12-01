var express = require("express");
var http = require('http');
var morgan = require("morgan");
var ejs = require("ejs");
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://asrikant:nodeproject@ds259305.mlab.com:59305/dist';
var fs   = require("fs");
var log = console.log.bind(this);

var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

//Init App
var app = express();

// View Engine
app.use(morgan('tiny'));
app.set('view engine', 'ejs');

//Set Static Folder
app.use(express.static(__dirname + '/public'));

// Other routes
var generalRoutes = require('./routes/routes.js')
var users = require('./routes/user.js')

// Route from main
// app.use('/login', generalRoutes)
// app.use('/users', users);


// Express Session
app.use(session({ 
    secret: 'mySecretKey',
    saveUninitialized: true,
    resave: true }));

//Connect flash
app.use(flash());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use(session({ secret: 'mySecretKey' })); // session secret
// app.use(flash()); // use connect-flash for flash messages stored in session


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
});
}
));

//Connect the database
mongoose.connect(mongoDB, {
  useMongoClient: true
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function (callback) {
    generalRoutes.init(app, passport);
    // require('./routes/user.js').init(app);
});




    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    // app.get('/login', function(req, res) {

    //     // render the page and pass in any flash data if it exists
    //     res.render('login.ejs', { message: req.flash('loginMessage') }); 
    // });

// Main Page Access.
app.get("/movie", function (req, res) {
    fs.readFile('public/movie.html', function (error, data) {
        if (error) log("Error:", error);
        else       res.send(data.toString());
    });
});

/*1*/ var httpServer = http.Server(app);
/*2*/ var sio =require('socket.io');
/*3*/ var io = sio(httpServer);
/*4*/ httpServer.listen(50000, function() {
    console.log('Listening on 50000');
});

var ticketBookingSockets = require('./routes/ticketBooking_server.js');
ticketBookingSockets.init(io);









