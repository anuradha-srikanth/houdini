var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

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

var UserModel = mongoose.model('User', User);
module.exports = UserModel;

