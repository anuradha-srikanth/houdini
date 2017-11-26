
exports.init = function(io) {

  var seats = [
  [1,1,0,1,1,0,0,0,0,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
  [1,1,0,1,1,1,1,1,1,1,1,0,1,1]
  ];

    var currentClients = 0; // keep track of the number of players
  //   // var time = 0;
  //   var time = 0;
  //   var username = "";

  //   setInterval(function() {
  //       ++time;
  //       io.sockets.emit('timeout', {
  //           mess: time
  //       });
  //       // console.log('hi')
  //   }, 1000 );

  //   // socket.on('update time', function(newTime){
  //   //  time = newTime
  //   // });

  // // When a new connection is initiated
  // io.sockets.on('connection', function (socket) {
  //   ++currentClients;
  //   socket.playerNum = currentClients
  //       // Send ("emit") a 'players' event back to the socket that just connected.
  //       socket.emit('players', {
  //           number: currentClients
  //       });

  //       /*
  //        * Emit players events also to all (i.e. broadcast) other connected sockets.
  //        * Broadcast is not emitted back to the current (i.e. "this") connection
  //        */
  //        socket.broadcast.emit('players', { 
  //           number: currentClients
  //        });


  //        * Upon this connection disconnecting (sending a disconnect event)
  //        * decrement the number of players and emit an event to all other
  //        * sockets.  Notice it would be nonsensical to emit the event back to the
  //        * disconnected socket.

  //        socket.on('disconnect', function () {
  //           --currentClients;
  //           socket.broadcast.emit('players', {
  //               number: currentClients
  //           });
  //        });


  //        socket.emit('welcome', {
  //           message: "Welcome player ",
  //           number: socket.playerNum
  //        });

  //        socket.on('chat message', function(data){
  //           io.sockets.emit('send',{
  //               user: socket.username,
  //               message: data
  //           });
  //           // console.log(data);
  //       });



  //        socket.on('get user', function(username){
  //           // io.sockets.emit('send',{
  //           //  message: data
  //           // });
  //           // console.log(data);
  //           socket.username = username
  //           socket.emit('display chat', {
  //               user: username
  //           });
  //       });


  //       });

  /* Demo1-MovieTheater/app.js
 * 
 */



 // var log = console.log.bind(this);

/* Seat map. 
 * 0 = NO SEAT
 * 1 = AVAILABLE SEAT
 * 2 = OCCUPIED SEAT
 */
 // var seats = [
 // [1,1,0,1,1,0,0,0,0,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1],
 // [1,1,0,1,1,1,1,1,1,1,1,0,1,1]
 // ];

 // /* Initialize Express App. */
 // var app = express();
 // app.use(app.router);

/* 
 * GET Requests. 
 */
// Main Page Access.
// app.get("/", function (req, res) {
//     fs.readFile('movie.html', function (error, data) {
//         if (error) log("Error:", error);
//         else       res.send(data.toString());
//     });
// });
// // Get seat map.
// app.get("/seats", function (req, res) {
//     res.send(seats);
// });

// /* Start Server. */
// var server = http.createServer(app);
// server.listen(8000, function () {
//     log("Server running at port 8000.");
// });

// /* Attach Socket.io to server. */
// var io = sio.listen(server);
io.sockets.on('connection', function (socket) {
  // Arbitrary two rooms to test, will add login conditions later
  roomId = currentClients % 2
  // socket.join('some room');

  ++currentClients;
  console.log("Current users: "+currentClients)

  socket.on('disconnect', function () {
    --currentClients;
    console.log("Current users: "+currentClients)
  });

  /* Reserve Seat only if not already occupied. */
  socket.on('reserve', function (data) {
    if (seats[data.y][data.x] != 2) {
      seats[data.y][data.x] = 2;
      io.sockets.emit('seat_update', data, socket.id);
    }
  });

  socket.on('get seats init', function(){
    socket.emit('receive seats init', seats);
  })

//  socket.on('reserveBatch', function (data) {
//      var checked = true;
//      data.forEach(function (rowcol) {
//          if (seats[rowcol[1]][rowcol[0]] != 1) checked = false;
//      });
//      
//      if (!checked) socket.emit('reserveReject');
//      else {
//          data.forEach(function (rowcol) {
//              seats[rowcol[1]][rowcol[0]] = 2;
//          });
//          io.sockets.emit('seatUpdateBatch', data, socket.id);
//      }
//  });

/* Cancel Seat only if not already canceled. */
socket.on('cancel', function (data) {
  if (seats[data.y][data.x] != 1) {
    seats[data.y][data.x] = 1;
    io.sockets.emit('seat_cancel_update', data);
  }
});

console.log(socket.id);
});
}
