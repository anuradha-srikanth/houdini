var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var User = require('../models/users');

// var passportLocalMongoose = require('passport-local-mongoose');

var Ticket = new Schema({
  ticket_id : ObjectId,
  owner : { type: Schema.Types.ObjectId, ref: 'User'},
  seat : {type: Schema.Types.ObjectId, ref: 'Seat'}
});

// User.methods.validPassword = function( pwd ) {
//     // EXAMPLE CODE!
//     return ( this.password === pwd );
// };

// User.plugin(passportLocalMongoose);
module.exports = mongoose.model('Ticket', Ticket);

