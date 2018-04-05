module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websiteModel = require('../models/website/website.model.server');
  var userModel = require('../models/user/user.model.server');

  // function findAllWebsitesForUser(req, res) {
  //   console.log("server side find all website for user");
  //   var userId = req.params.userId;
  //   var websiteSet = [];
  //   for (var i = 0; i < websites.length; i++) {
  //     if (websites[i].developerId === userId) {
  //       websiteSet.push(websites[i]);
  //     }
  //   }
  //   console.log('userId ' + userId + ' has ' + websiteSet.length + ' websites.');
  //   res.json(websiteSet);
  // }

  function findAllWebsitesForUser(req, res) {
    console.log('server side find all website for user');
    var userId = req.params.userId;
    websiteModel.findWebsitesForUser(userId).then(
      function (website) {
        console.log('find all website =' + website)
        res.json(website);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  // function findAllWebsitesForUser(req, res) {
  //   console.log("server side find all website for user");
  //   var userId = req.params.userId;
  //   var resultSet = [];
  //   for (var x = 0; x < websites.length; x++) {
  //     if (websites[x].developerId === userId) {
  //       resultSet.push(websites[x]);
  //     }
  //   }
  //   res.json(resultSet);
  // }


  function createWebsite(req, res) {
    console.log('server side create website');
    var userId = req.params['userId'];
    var website = req.body;
    // console.log(req);
    website.developerId = userId;
    delete website._id;
    websiteModel.createWebsite(website)
      .then(function (website) {
        console.log('website= ' + website)
        websiteModel.findWebsitesForUser(userId)
          .then(function (websites) {
            res.json(websites);
          })
      }, function (err) {
        console.log(err);
      });
  }


  // function createWebsite(req, res) {
  //   var userId = req.params.userId;
  //   var website = req.body;
  //   websiteModel.createWebsiteForUser(userId, website).then(
  //     function (website) {
  //       if (website) {
  //         res.json(website);
  //       } else {
  //         res.sendStatus(400).send("Something went wrong");
  //       }
  //     },
  //     function (err) {
  //       res.sendStatus(400).send(err);
  //     }
  //   );
  // }


  //app.put("/api/website/:websiteId", updateWebsite);
  // function updateWebsite(req, res) {
  //   console.log('server side update website');
  //   var websiteId = req.params.websiteId;
  //   var updatedWebsite = req.body;
  //   for (var i = 0; i < websites.length; i++) {
  //     if (websiteId == websites[i]._id) {
  //       websites[i].name = updatedWebsite.name;
  //       websites[i].description = updatedWebsite.description;
  //       res.json(updatedWebsite);
  //     }
  //   }
  //   res.status(404).send("website not found");
  // }

  // function updateWebsite(req, res) {
  //   var websiteId = req.params.websiteId;
  //   var updatedWebsite = req.body;
  //
  //   websiteModel.updateWebsite(websiteId, updatedWebsite).then(
  //     function (website) {
  //       if (website) {
  //         res.json(website);
  //       } else {
  //         res.sendStatus(400).send("Cannot find website with corresponding Id");
  //       }
  //     },
  //     function (err) {
  //       res.sendStatus(400).send(err);
  //     }
  //   );
  // }

  function updateWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;
    console.log(newWebSite);
    websiteModel.updateWebsite(websiteId, newWebSite)
      .then(function (status) {
        console.log(status)
        websiteModel.findWebsitesForUser(userId)
          .then(function (websites) {
            res.json(websites);
          })
      }, function (err) {
        console.log(err);
      });
  }

  // function findWebsiteById(req, res) {
  //   console.log('server side find website by id');
  //   var websiteId = req.params.websiteId;
  //   // console.log('come here1');
  //   for (var i = 0; i < websites.length; i++) {
  //     // console.log('come here2');
  //     if (websiteId == websites[i]._id) {
  //       // console.log('come here3');
  //       return res.json(websites[i]);
  //     }
  //   }
  //   // console.log('come here4');
  //   res.status(404).send("website can not be found.");
  // }

  function findWebsiteById(req, res) {
    console.log('server side find website by id');
    var websiteId = req.params.websiteId;
    websiteModel.findWebsiteById(websiteId).then(
      function (website) {
        if (website) {
          console.log('website= ' + website);
          res.json(website);
        } else {
          res.sendStatus(400).send("Cannot find website with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }


  // function deleteWebsite(req, res) {
  //   console.log('server side delete website');
  //   var websiteId = req.params.websiteId;
  //   for (var i = 0; i < websites.length; i++) {
  //     if (websites[i]._id == websiteId) {
  //       res.json(websites[i]);
  //       console.log('size before = ' + websites.length);
  //       websites.splice(i, 1);
  //       console.log('size after = ' + websites.length);
  //       return;
  //     }
  //   }
  //   res.status(404).send("Website with ID: " + websiteId + " cannot be found");
  // }

  function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId).then(
      function (website) {
        res.json(website);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

};


