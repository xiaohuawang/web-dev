var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  facebook: {
    id: String,
    token: String
  },
  websites: [websiteSchema],
  dob: Date,
}, {collection: 'user'});

module.exports = UserSchema;

// var mongoose = require('mongoose');
//
// var UserSchema = mongoose.Schema({
//   username: String,
//   password: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: String,
//   websites: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'WebsiteSchema'
//   }],
//   dateCreated: {
//     type: Date,
//     default: Date.now
//   }
// }, { collection: 'user' });
//
// module.exports = UserSchema;
