var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
  name: String,
  // pages:[PageSchema],
  developerId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  description: String,
  created: {type: Date, default: Date.now}
}, {collection: 'website'})

module.exports = WebsiteSchema;

// var mongoose = require('mongoose');
//
// var WebsiteSchema = mongoose.Schema({
//   _user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'UserModel'
//   },
//   name: String,
//   description: String,
//   pages: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'PageModel'
//   }],
//   dateCreated: {
//     type: Date,
//     default: Date.now
//   }
// }, { collection: 'website' });
//
// module.exports = WebsiteSchema;
