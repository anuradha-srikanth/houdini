var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var User = require('../models/users');

var Ticket = new Schema({
  ticket_id : ObjectId,
  owner : { type: Schema.Types.ObjectId, ref: 'User'},
  seat : {type: Schema.Types.ObjectId, ref: 'Seat'}
});

module.exports = mongoose.model('Ticket', Ticket);

