
exports.init = function(io) {
  var Seat = require('../models/seats');

  var tickets = [];
  var seats = [];
  
  for(var i=0; i<11; i++){
    r = []
    s = []

    for(var j=0; j<=1; j++){
      var singleSeat = new Seat()
      singleSeat.state = 'Empty';
      singleSeat.price = 50;
      singleSeat.row = i;
      singleSeat.column = j;
      r.push(singleSeat);
      s.push(1);
    }
    for(var n=2; n<=2; n++){
      r.push(null);
      s.push(0);
    }
    if(i != 0){
      for(var k=3; k<=10; k++){
        var singleSeat = new Seat()
        singleSeat.state = 'Empty';
        singleSeat.price = 50;
        singleSeat.row = i;
        singleSeat.column = j;
        r.push(singleSeat);
        s.push(1);
      }
    }
    else{
      for(var k=3; k<=4; k++){
        var singleSeat = new Seat()
        singleSeat.state = 'Empty';
        singleSeat.price = 50;
        singleSeat.row = i;
        singleSeat.column = j;
        r.push(singleSeat);
        s.push(1);

      }
      for(var k=5; k<=8; k++){
        r.push(null);
        s.push(0);
      }
      for(var k=9; k<=10; k++){
        var singleSeat = new Seat()
        singleSeat.state = 'Empty';
        singleSeat.price = 50;
        singleSeat.row = i;
        singleSeat.column = j;
        r.push(singleSeat);
        s.push(1);
      }
    }
    for(var n=11; n<=11; n++){
      r.push(null);
      s.push(0);
    }
    for(var m=12; m<=13; m++){
      var singleSeat = new Seat()
      singleSeat.state = 'Empty';
      singleSeat.price = 50;
      singleSeat.row = i;
      singleSeat.column = j;
      r.push(singleSeat);
      s.push(1);
    }
    tickets.push(r)
    seats.push(s)
  }

  var currentClients = 0; // keep track of the number of players

  io.sockets.on('connection', function (socket) {
    socket.username = null
    ++currentClients;
    console.log("Current users: "+currentClients);
    console.log(`Connected user: ${socket.username}`);

    socket.on('disconnect', function () {
      --currentClients;
      console.log("Current users: "+currentClients)
    });

    /* Reserve Seat only if not already occupied. */
    socket.on('reserve', function (data) {
      console.log('reserve received');
      if (tickets[data.y][data.x].state != 'Occupied'){
        tickets[data.y][data.x].state = 'Occupied';
        tickets[data.y][data.x].owner = socket.username;
        console.log(tickets[data.y][data.x]);
        // io.sockets.emit('seat_update', data, socket.id);
      }
      if (seats[data.y][data.x] != 2) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('seat update', data, socket.id);
      }
      // console.log(tickets[0]);
    });
    // seat update emit this with s with objects

    socket.on('get seats init', function(data){
      // console.log(data);
      socket.username = data.username;
      // console.log("socket username set" + socket.username);
      socket.emit('receive seats init', seats);
    })


    /* Cancel Seat only if not already canceled. */
    socket.on('cancel', function (data) {
      if (tickets[data.y][data.x].state != 'Empty'){
        tickets[data.y][data.x].state = 'Empty';
        tickets[data.y][data.x].owner = null;
        // io.sockets.emit('seat_update', data, socket.id);
      }
      if (seats[data.y][data.x] != 1) {
        seats[data.y][data.x] = 1;
        io.sockets.emit('seat cancel update', data);
      }
    });

    socket.on('buy tickets', function(data){

      for(var i=0; i< tickets.length; i++){
        for(var j=0; j< tickets[0].length; j++){
          // console.log(i,j);
          // console.log(tickets[0]);
          if(tickets[i][j]){
          console.log(tickets[i][j].owner);}
          if(tickets[i][j] && tickets[i][j].owner == data.username){
            tickets[i][j].state = 'Reserved';
            tickets[i][j].save(function(err){
              if (err) { return err;}
            })
            // seats[i][j] = 
            console.log('buy tickets called');
            socket.emit('block seat map', {
              y: i,
              x: j,
              sid: socket.id
            });
          }
        }
      }
    });

    // console.log(socket.id);
    // console.log("seats map")
    // // var singleSeat = new Seat()
    // // singleSeat.state = 'Present';
    // // singleSeat.price = 50
    // // s[0][0] = singleSeat
    // // console.log(singleSeat)
    // console.log(seats)
  });
}
