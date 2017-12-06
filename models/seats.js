var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Ticket = require('../models/tickets');

// var passportLocalMongoose = require('passport-local-mongoose');

var Seat = new Schema({
  seat_id : ObjectId,
  state : {
    type: String,
    enum: ['No Seat', 'Empty', 'Occupied', 'Reserved']
  },
  price : Number,
  owner : String,
  rows : Number,
  cols : Number,
  ticket : { type: Schema.Types.ObjectId, ref: 'Ticket'}
});

// User.methods.validPassword = function( pwd ) {
//     // EXAMPLE CODE!
//     return ( this.password === pwd );
// };

// User.plugin(passportLocalMongoose);
module.exports = mongoose.model('Seat', Seat);

