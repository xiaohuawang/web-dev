var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app) {

  var userModel = require("../models/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  // app.get("/api/user?username=username", findUserByUsername);
  // app.get("/api/user?username=username&password=password", findUserByCredentials);

  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedIn", loggedIn);


  var facebookConfig = {
    // clientID: process.env.FACEBOOK_CLIENT_ID,
    // clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // callbackURL: process.env.FACEBOOK_CALLBACK_URL

    clientID: 119189685556051,
    clientSecret: '026788c161ba91cff18643771c75f1c0',
    callbackURL: 'https://xiaohuawebapp.herokuapp.com/auth/facebook/callback'
  };


  // // use facebook login
  app.get("/auth/facebook/callback",
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
      // successRedirect: '/user',
      // failureRedirect: '/login'
    })
  );

  app.get("/facebook/login", passport.authenticate('facebook', {scope: 'email'}));

  passport.use(new LocalStrategy(localStrategy));

  function localStrategy(username, password, done) {
    console.log('server side localStrategy');
    userModel.findUserByUserName(username).then(
      function (user) {
        console.log('user= '+user);
        if (user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          console.log('else?');
          return done(null, false);
        }
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }

  passport.serializeUser(serializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);

  function deserializeUser(user, done) {
    userModel.findUserById(user._id).then(
      function (user) {
        done(null, user);
      },
      function (err) {
        done(err, null);
      }
    );
  }

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(
      function (user) {
        if (user) {
          return done(null, user);
        } else {
          var names = profile.displayName.split(" ");
          var newFacebookUser = {
            username: 'username',
            password: 'password',
            // username: '123',
            // password: '123',
            lastName: names[1],
            firstName: names[0],
            email: profile.emails ? profile.emails[0].value : "",
            facebook: {
              id: profile.id,
              token: token
            }
          };
          return userModel.createUser(newFacebookUser);
        }
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    ).then(
      function (user) {
        return done(null, user);
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }

  function loggedIn(req, res) {
    res.json(req.isAuthenticated() ? req.user : '0');
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logout();
    res.json(true);
  }

  function register(req, res) {
    console.log('server side register user');
    var newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password);
    userModel.findUserByUserName(newUser.username).then(
      function (user) {
        if (user) {
          res.sendStatus(400).json("Username already exist!");
          return;
        } else {
          userModel.createUser(newUser).then(
            function (user) {
              if (user) {
                req.login(user, function (err) {
                  if (err) {
                    res.sendStatus(400).send(err);
                  } else {
                    res.json(user);
                  }
                });
              }
            }
          )
        }
      }
    )
  }

  function createUser(req, res) {
    console.log('server side create user');
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
