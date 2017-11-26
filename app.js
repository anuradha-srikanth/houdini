var express = require("express");
var http = require('http');
var morgan = require("morgan");
var ejs = require("ejs");
var app = express();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://asrikant:nodeproject@ds259305.mlab.com:59305/dist';
var fs   = require("fs");
var log = console.log.bind(this);

mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function (callback) {

// var app = express();
    require('./routes/user.js').init(app);
});


app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

// app.get('/',function(req, res){
//     res.sendFile('index.html');
// })
// app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

// var seats = [
//     [1,1,0,1,1,0,0,0,0,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
//     [1,1,0,1,1,1,1,1,1,1,1,0,1,1]
// ];

// Main Page Access.
app.get("/movie", function (req, res) {
    fs.readFile('public/movie.html', function (error, data) {
        if (error) log("Error:", error);
        else       res.send(data.toString());
    });
});
// // Get seat map.
// app.get("/seats", function (req, res) {
//     res.send(seats);
// });

// var express = require('express');  
// var app = express();  
// var server = require('http').createServer(app);  
// var io = require('socket.io')(server);

/*1*/ var httpServer = http.Server(app);
/*2*/ var sio =require('socket.io');
/*3*/ var io = sio(httpServer);
/*4*/ httpServer.listen(50000, function() {console.log('Listening on 50000');});

// app.listen(5000);
// console.log("Server listening at http://localhost:5000/");

var ticketBookingSockets = require('./routes/ticketBooking_server.js');
ticketBookingSockets.init(io);









