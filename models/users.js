var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Ticket = require('../models/tickets');

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  user_id : ObjectId,
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  password_confirmation: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String
  },
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  }]
});

User.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

User.methods.getTickets = function(){
  // User.
  return this.tickets
}; 

// User.methods.fromUsername = function(){
//   return this.
// };
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

