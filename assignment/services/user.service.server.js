module.exports = function (app) {

  var userModel = require("../models/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  // app.get("/api/user?username=username", findUserByUsername);
  // app.get("/api/user?username=username&password=password", findUserByCredentials);

  // var users = [
  //   {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
  //   {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
  //   {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
  //   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  // ];


  // function createUser(req, res) {
  //   var user = req.body;
  //   for (var x = 0; x < users.length; x++) {
  //     if (users[x].username === user["username"]) {
  //       res.status(404).send('username already exist.');
  //       return;
  //     }
  //   }
  //
  //   user._id = Math.random().toString();
  //   users.push(user);
  //   res.json(user);
  // };

  // function createUser(req, res) {
  //   console.log('server side create user');
  //   var newUser = req.body;
  //   console.log('new user username= ' + newUser.username);
  //   // console.log('new user username= ' + newUser.username);
  //   // console.log('new user password= ' + newUser.password);
  //   userModel.createUser(newUser)
  //     .then(function (user) {
  //       // console.log('here user id = ' + user.id);
  //       res.json(user);
  //     })
  // }

  function createUser(req, res) {
    console.log('server side create user')
    var user = req.body;
    userModel.createUser(user).then(
      function (user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("Something went wrong");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  };

  // function findUser(req, res) {
  //
  //   console.log('server side find user');
  //   var username = req.query["username"];
  //   var password = req.query["password"];
  //
  //   var user = null;
  //
  //   // if (username && password) {
  //   //   user = users.find(function (user) {
  //   //     return user.username === username && user.password === password;
  //   //   });
  //   // }
  //   // res.json(user);
  //
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].username === username && users[i].password === password) {
  //       res.json(users[i]);
  //       return;
  //     }
  //   }
  //   res.status(404).send('username and password do not match');
  //   // res.send("username and password do not match");
  // }

  // function findUser(req, res) {
  //   console.log('server side find user');
  //   var username = req.query["username"];
  //   var password = req.query["password"];
  //   if (username && password) {
  //     var promise = userModel.findUserByCredentials(username, password);
  //     promise.then(function (user) {
  //       res.json(user);
  //     });
  //   } else if (username) {
  //     userModel.findUserByUserName(username)
  //       .then(function (user) {
  //         res.json(user);
  //       })
  //   } else {
  //     userModel.findAllUsers()
  //       .then(function (users) {
  //         console.log(user);
  //         res.status(200).json(users);
  //       })
  //   }
  // }


  function findUser(req, res) {
    if (req.query["password"]) {
      findUserByCredentials(req, res);
    } else {
      findUserByUsername(req, res);
    }
  }

  // function findUserByUsername(req, res) {
  //   var username = req.query["username"];
  //   userModel.findUserByUsername(username).then(
  //     function (user) {
  //       if (user) {
  //         res.json(user);
  //       } else {
  //         res.sendStatus(400).send("Cannot find user with the username");
  //       }
  //     },
  //     function (err) {
  //       res.sendStatus(400).send(err);
  //     }
  //   );
  // };

  function findUserByUsername(req, res) {
    var username = req.query["username"];
    userModel.findUserByUsername(username).then(
      function (user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("Cannot find user with the username");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  };

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel.findUserByCredentials(username, password).then(
      function (user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("Cannot find user with the username and password");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  // function findUser(req, res) {
  //   if (req.query["password"]) {
  //     findUserByCredentials(req, res);
  //   } else {
  //     findUserByUsername(req, res);
  //   }
  // }
  //
  // function findUserByUsername(req, res) {
  //   var username = req.query["username"];
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].username === username) {
  //       res.json(users[i]);
  //       return;
  //     }
  //   }
  //   res.status(404).send('Cannot find user with username: ' + username);
  // };
  //
  // function findUserByCredentials(req, res) {
  //   var username = req.query["username"];
  //   var password = req.query["password"];
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].username === username && users[i].password === password) {
  //       res.json(users[i]);
  //       return;
  //     }
  //   }
  //   // res.status(404).send('username and password do not match.');
  //   res.status(404).send("username and password do not match");
  // }

  // function findUserById(req, res) {
  //   var userId = req.params["userId"];
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i]._id === userId) {
  //       res.json(users[i]);
  //       return;
  //     }
  //   }
  //   res.status(404).send('Cannot find user with user ID: ' + userId);
  // };

  function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(
      function (user) {
        if (user) {
          console.log('user =' + user);
          res.json(user);
        } else {
          res.sendStatus(400).send("Cannot find user with the ID");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  };

  function updateUser(req, res) {
    console.log('server side update user');
    var userId = req.params["userId"];
    var updatedUser = req.body;
    console.log('updated user' + req.body);
    userModel.updateUser(userId, updatedUser).then(
      function (user) {
        if (user) {
          console.log('update user= ' + user);
          res.json(user);
        } else {
          res.sendStatus(400).send("Cannot find user")
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  };

  // function updateUser(req, res) {
  //   var userId = req.params["userId"];
  //   var updatedUser = req.body;
  //
  //   console.log("update user: " + userId + " " + updatedUser["firstName"] + " " + updatedUser["lastName"]);
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i]._id === userId) {
  //       users[i].firstName = updatedUser["firstName"];
  //       users[i].lastName = updatedUser["lastName"];
  //
  //       res.json(updatedUser);
  //       return;
  //     }
  //   }
  //   res.status(404).send('User not found!');
  // };

  // function deleteUser(req, res) {
  //   var userId = req.params["userId"];
  //   for (var x = 0; x < users.length; x++) {
  //     if (users[x]._id === userId) {
  //       res.json(users[x]);
  //       users.splice(x, 1);
  //       return;
  //     }
  //   }
  //   res.status(404).send('User cannot be found!');
  // };

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId).then(
      function (stats) {
        res.json(stats);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  };
}
