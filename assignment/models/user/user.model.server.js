var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUserName = findUserByUserName;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findUserByFacebookId = findUserByFacebookId;

module.exports = UserModel;

function updateUser(userId, user) {
  return UserModel.findByIdAndUpdate(userId, user);
}

function findUserByUserName(username) {
  return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function createUser(user) {
  console.log('user model user create username= ' + user.username);
  console.log('user model user create password= ' + user.password);
  return UserModel.create(user);
}

function findAllUsers() {
  return UserModel.find({});
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function deleteUser(userId) {
  return UserModel.findByIdAndRemove(userId);
}

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}
