// npm insatll mongoose --save
// var q = require('q');

// local
// var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev', {useMongoClient: true});
// var db = mongoose.connect('mongodb://localhost:27017/webdev');

//cloud
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://xiaohua:a62811610@ds135399.mlab.com:35399/heroku_r3jrthjf')

module.exports = db;


// todoSchema = mongoose.Schema({
//   title: String,
//   dudeDate: Date
// }, {collection: 'todo'});
//
// todoModel = mongoose.model('TodoModel', todoSchema);
//
// //instance
// // var todo1 = {
// //   title: 'Pickup yangyang',
// //   dudeDate: new Date()
// // };
//
// // todoModel.create(todo1, function (err, doc) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(doc);
// //   }
// // });
//
// // findAllTodos()
// //   .then(function (docs) {
// //     console.log(docs);
// //   });
//
// // todoModel
// //   .create(todo1)
// //   .then(function (doc) {
// //     console.log(doc);
// //   }, function (err) {
// //
// //   });
// // console.log(mongoose);
//
// createTodo({title: 'pickup aaaaa', dudeDate: new Date()})
//   .then(function (todo) {
//     // console.log(todo);
//     return findAllTodos()
//   })
//   .then(function (docs) {
//     console.log(docs);
//   });
//
//
// function createTodo(todo) {
//   return todoModel.create(todo);
// }
//
// function findAllTodos() {
//   return todoModel.find()
// }

