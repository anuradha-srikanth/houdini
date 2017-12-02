var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

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
    type: String
  },
  password_confirmation: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String
  }
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // }
});

User.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

