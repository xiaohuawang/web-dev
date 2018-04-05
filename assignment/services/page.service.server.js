module.exports = function (app) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  // pages = [
  //   {_id: "321", name: "Post 1", websiteId: "456", title: "Lorem"},
  //   {_id: "432", name: "Post 2", websiteId: "456", title: "Lorem"},
  //   {_id: "543", name: "Post 3", websiteId: "456", title: "Lorem"}
  // ];

  var pageModel = require("../models/page/page.model.server");

  // function findAllPagesForWebsite(req, res) {
  //   console.log('server side find all page for website');
  //   var websiteId = req.params.websiteId;
  //   var resultSet = [];
  //   for (var i = 0; i < pages.length; i++) {
  //     if (pages[i].websiteId === websiteId) {
  //       resultSet.push(pages[i]);
  //     }
  //   }
  //   res.json(resultSet);
  // }

  function findAllPagesForWebsite(req, res) {
    console.log('server side find all page for website');
    var websiteId = req.params.websiteId;
    pageModel.findAllPagesForWebsite(websiteId).then(
      function (page) {
        res.json(page);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    console.log(page);
    page._websiteId = websiteId;
    pageModel.createPage(websiteId, page)
      .then(function (response) {
        console.log('response= ' + response);
        res.status(200).send(response);
      });
  }

  // function createPage(req, res) {
  //   var websiteId = req.params.websiteId;
  //   var page = req.body;
  //   pageModel.createPage(websiteId, page).then(
  //     function (page) {
  //       if (page) {
  //         res.json(page);
  //       } else {
  //         res.sendStatus(400).send("Something went wrong");
  //       }
  //     },
  //     function (err) {
  //       res.sendStatus(400).send(err);
  //     }
  //   );
  // }

  // function deletePage(req, res) {
  //   console.log('server side delete page');
  //   var pageId = req.params.pageId;
  //   for (var i = 0; i < pages.length; i++) {
  //     if (pages[i]._id === pageId) {
  //       res.json(pages[i]);
  //       pages.splice(i, 1);
  //       return;
  //     }
  //   }
  //   res.status(404).send("Cannot find page");
  // }

  // function deletePage(req, res) {
  //   console.log('server side delete page');
  //   var pageId = req.params.pageId;
  //   pageModel.deletePage(pageId)
  //     .then(function (response) {
  //       res.send(200).json(response);
  //     }, function (err) {
  //       console.log(err);
  //       res.send(500);
  //     });
  // }

  function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel.deletePage(pageId).then(
      function (page) {
        res.json(page);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  // function findPageById(req, res) {
  //   console.log('server side find page by id');
  //   var pageId = req.params.pageId;
  //   for (var i = 0; i < pages.length; i++) {
  //     if (pages[i]._id === pageId) {
  //       return res.json(pages[i]);
  //     }
  //   }
  //   res.status(404).send("Cannot find page.");
  // }

  function findPageById(req, res) {
    console.log('server side find page by id');
    var pageId = req.params.pageId;
    pageModel.findPageById(pageId)
      .then(function (page) {
        console.log('page= ' + page);
        res.status(200).json(page);
      }, function (err) {
        console.log(err);
        res.status(500);
      })
  }


  // function updatePage(req, res) {
  //   console.log('server side update page');
  //   var pageId = req.params.pageId;
  //   var updatedPage = req.body;
  //   for (var i = 0; i < pages.length; i++) {
  //     if (pages[i]._id === pageId) {
  //       pages[i].name = updatedPage.name;
  //       pages[i].title = updatedPage.title;
  //       res.json(pages[i]);
  //       return;
  //     }
  //   }
  //   res.status(404).send("Cannot find page");
  // }

  // function updatePage(req, res) {
  //   console.log('server side update page');
  //   var pageId = req.params.pageId;
  //   var page = req.body;
  //   pageModel.updatePage(pageId, page)
  //     .then(function (response) {
  //       res.send(200).json(response);
  //     }, function (err) {
  //       console.log(err);
  //       res.send(500);
  //     })
  // }

  function updatePage(req, res) {
    var pageId = req.params.pageId;
    var updatedPage = req.body;
    pageModel.updatePage(pageId, updatedPage).then(
      function (page) {
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send("Cannot find page with corresponding Id");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }
}
