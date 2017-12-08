var rows,cols;
var selectCount = 1;
var socket = io.connect('/');

socket.on('seat update', function (data, sid) {
  var target = $('div[data-x = ' + data.x + '][data-y = ' + data.y + ']');
    target.removeClass('enable'); // Remove class attributes for seat.
    target.addClass('disable');   // Add class attributes for seat.
    target.off('click');          // Remove onclick listener.

    // If I'm the one who requested,
    // Remove 'diabled' class from seat.
    // Add 'mySeat' class properties and add click listener for canceling.
    if (sid == socket.id) {
      target.removeClass('disable'); 
      target.addClass('mySeat').on('click', onClickSeatCancel); 
    }
  });

socket.on('seat update batch', function (data, sid) {
  data.forEach(function (xyArray) {
    var target = $('div[data-x = ' + xyArray[0] + '][data-y = ' + xyArray[1] + ']');
    target.removeClass('enable'); // Remove class attributes for seat.
    target.addClass('disable');   // Add class attributes for seat.
    target.off('click');          // Remove onclick listener.

    if (sid == socket.id) {
      target.removeClass('disable'); 
      target.addClass('mySeat').on('click', onClickSeatCancel); 
    }
  });
});

socket.on('reserve reject', function () {
  alert('Seats rejected.'); 
});

socket.on('seat cancel update', function (data, sid) {
  var target = $('div[data-x = ' + data.x + '][data-y = ' + data.y + ']');
  target.removeClass('disable');
  target.removeClass('mySeat');
  target.off('click');
  target.addClass('enable').on('click', onClickSeat);;
});


var onClickSeat = function () {
  var clickX = $(this).attr('data-x');
  var clickY = $(this).attr('data-y');

// If seat in available and user confirmed.
if ($(this).hasClass('enable') && confirm('Reserve this seat?')) {
 socket.emit('reserve', {
   x: clickX,
   y: clickY
 });
}
}
var onClickSeatCancel = function () {
 var x = $(this).attr('data-x');
 var y = $(this).attr('data-y');

 if (confirm('Cancel this seat?')) {
   socket.emit('cancel', {
     x: x,
     y: y
   });
 }
}

socket.on('receive seats init', function(data){
  seats = data
  rows = seats.length;
  cols = seats[0].length;
  $.each(seats, function (indexY, line) {
    var $line = $('<div></div>').addClass('line');
    $.each(line, function (indexX, seat) {
      console.log(indexX, indexY);
      var output = $('<div></div>', {
        'class': 'seat',
        'data-x': indexX,
        'data-y': indexY
      }).appendTo($line);
      if (seat == 1)
        output.addClass('enable').on('click', onClickSeat);
      else if (seat == 2)
        output.addClass('disable');
    });
    // $line.appendTo('body');
    $('.here').append($line);
  }); 

});

var buyTickets = function() {
  console.log('buyTickets function is called');
  $.getJSON('/username', function (data) {
    console.log(data);
    socket.emit('buy tickets', {
      username: data.username
    });
  });
}

socket.on('block seat map', function (data) {
  console.log('block seat map emitted');
  console.log(data);
  var target = $('div[data-x = ' + data.x + '][data-y = ' + data.y + ']');
    target.removeClass('disable'); // Remove class attributes for seat.
    target.removeClass('mySeat'); // Remove class attributes for seat.
    target.addClass('reserve');   // Add class attributes for seat.
    target.off('click');          // Remove onclick listener.

    // If I'm the one who requested,
    // Remove 'diabled' class from seat.
    // Add 'mySeat' class properties and add click listener for canceling.
    if (data.sid == socket.id) {
      target.removeClass('reserve'); 
      target.addClass('myReserved');
      // .on('click', onClickSeatCancel); 
    }
  });

$(document).ready(function () {
  $.getJSON('/username', function (data) {
    console.log(data);
    socket.emit('get seats init', { 
      username: data.username
    });
  });
});


