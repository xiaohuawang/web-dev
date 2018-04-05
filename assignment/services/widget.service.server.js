module.exports = function (app) {

  var widgetModel = require("../models/widget/widget.model.server");
  var path = require('path');
  var multer = require('multer');
  var upload = multer({dest: __dirname + '/../../src/assets/uploads'});
  // var baseUrl = "http://localhost:3100";
  // var baseUrl = "https://xiaohuawebapp.herokuapp.com";
  // var baseUrl = "http://localhost:3100"; // for local
  var baseUrl = ""; // for development

  app.post("/api/page/:pageId/widget", createWidget); //ok
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage); //ok
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.get("/api/widget/:widgetId", findWidgetById); //ok
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);//ok

  // UPLOAD IMAGE
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.get("/api/image/:imageName", findImage);

  //

  // function findImage(req, res) {
  //   console.log('server side find image');
  //   var imageName = req.params.imageName;
  //   console.log('image name = ' + imageName);
  //   // res.sendFile(path.resolve("./assignment/uploads/" + imageName));
  //   res.sendFile(path.resolve("/../../src/assets/uploads" + imageName));
  // }

  function findImage(req, res) {
    console.log('server side find image!!!!');
    var imageName = req.params.imageName;
    res.sendFile(path.resolve("./src/assets/uploads/" + imageName));
  }

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    // condition when myFile is null
    if (myFile == null) {
      res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
      return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    // find widget by id
    var imageUrl = baseUrl + "/api/image/" + filename;
    console.log('image url =' + imageUrl);
    var widget = {url: imageUrl};
    widgetModel
      .updateWidget(widgetId, widget)
      .then(function (stats) {
          console.log(stats);
          res.send(200);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });

    res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
  }

  // function uploadImage(req, res) {
  //   console.log('server side upload image');
  //   var widgetId = req.body.widgetId;
  //   var width = req.body.width;
  //   var myFile = req.file;
  //
  //   var userId = req.body.userId;
  //   var websiteId = req.body.websiteId;
  //   var pageId = req.body.pageId;
  //
  //   // condition when myFile is null
  //   if (myFile == null) {
  //     const tempUrl = baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
  //     console.log('temp url = ' + tempUrl);
  //     // res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
  //     res.redirect(tempUrl);
  //     return;
  //   }
  //
  //   var originalname = myFile.originalname; // file name on user's computer
  //   var filename = myFile.filename; // new file name in upload folder
  //   var path = myFile.path; // full path of uploaded file
  //   var destination = myFile.destination; // folder where file is saved to
  //   var size = myFile.size;
  //   var mimetype = myFile.mimetype;
  //
  //   // find widget by id
  //   var widget;
  //   console.log('widget id= ' + widgetId);
  //   console.log('path: ' + path);
  //   console.log('destination = ' + destination);
  //   console.log('filename = ' + filename);
  //
  //   for (var i = 0; i < widgets.length; i++) {
  //     if (widgets[i]._id === widgetId) {
  //       widget = widgets[i];
  //     }
  //   }
  //   // /assets/uploads/2d66ab8458b9caff64895eb45aba5c1b
  //   // widget.url= '/uploads/' + filename;
  //   widget.url = '/assets/uploads/' + filename;
  //   // widget.url = '/assets/uploads/781ac686c0ca7138d8ef58406ede42a9';
  //   console.log('widgeturl = ' + widget.url);
  //
  //   res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
  // }


  // function findImage(req, res) {
  //   console.log('server side find image');
  //   var imageName = req.params.imageName;
  //   res.sendFile(path.resolve("./assignment/uploads/" + imageName));
  // }

  // function findAllWidgetsAllPage(req, res) {
  //   console.log('server side findAllWidgetsAllPage');
  //   var pageId = req.params.pageId;
  //   var resultSet = [];
  //   for (var i = 0; i < widgets.length; i++) {
  //     if (widgets[i].pageId === pageId) {
  //       resultSet.push(widgets[i]);
  //     }
  //   }
  //   res.json(resultSet);
  // }


  function findAllWidgetsForPage(req, res) {
    console.log('server side findAllWidgetsForPage');
    var pageId = req.params.pageId;
    console.log('page id= ' + pageId);
    widgetModel.findAllWidgetsForPage(pageId).then(
      function (widget) {
        // console.log('all widget= ' + widget);
        res.json(widget);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  // function updateWidget(req, res) {
  //   console.log('server side update widget');
  // }

  function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
      .findWidgetById(widgetId)
      .then(function (widget) {
          res.json(widget);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var updatedWidget = req.body;
    widgetModel.updateWidget(widgetId, updatedWidget)
      .then(function (stats) {
          res.json(stats);
        },
        function (err) {
          res.sendStatus(404).send(err);
        });
  }

  // function updateWidget(req, res) {
  //   console.log('server side update widget');
  //   var widgetId = req.params.widgetId;
  //   var updatedWidget = req.body;
  //   console.log('update widget url = ' + updatedWidget.url);
  //   for (var i = 0; i < widgets.length; i++) {
  //     if (widgets[i]._id === widgetId) {
  //       switch (widgets[i].widgetType) {
  //         case 'HEADER':
  //           widgets[i].text = updatedWidget.text;
  //           widgets[i].size = updatedWidget.size;
  //           widgets[i].url = "";
  //           widgets[i].width = "";
  //           res.json(widgets[i]);
  //           return;
  //
  //         case 'YOUTUBE':
  //           widgets[i].text = updatedWidget.text;
  //           widgets[i].size = "";
  //           widgets[i].url = updatedWidget.url;
  //           widgets[i].width = updatedWidget.width;
  //           res.json(widgets[i]);
  //           return;
  //
  //         case 'IMAGE':
  //           widgets[i].text = updatedWidget.text;
  //           widgets[i].size = "";
  //           widgets[i].url = updatedWidget.url;
  //           widgets[i].width = updatedWidget.width;
  //           res.json(widgets[i]);
  //           return;
  //
  //         case 'TEXT' :
  //           widgets[i].name = updatedWidget.name;
  //           widgets[i].text = updatedWidget.text;
  //           widgets[i].rows = updatedWidget.rows;
  //           widgets[i].formatted = updatedWidget.formatted;
  //           widgets[i].placeholder = updatedWidget.placeholder;
  //           res.json(widgets[i]);
  //           return;
  //
  //         case 'HTML' :
  //           widgets[i].text = updatedWidget.text;
  //           widgets[i].name = updatedWidget.name;
  //           res.json(widgets[i]);
  //           return;
  //
  //         default:
  //           res.status(404).send("Widget Type does not exist.");
  //           return;
  //       }
  //     }
  //   }
  //   console.log("error");
  //   res.status(404).send("Widget ID cannot be found.");
  // }


  function createWidget(req, res) {
    console.log('server side create widget');
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel.createWidget(pageId, widget).then(
      function (widget) {
        if (widget) {
          console.log(widget);
          res.json(widget);
        } else {
          res.sendStatus(400).send("Something went wrong");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.deleteWidget(widgetId).then(
      function (stats) {
        res.json(stats);
      },
      function (err) {
        res.sendStatus(404).send(err);
      }
    );
  }

  // function deleteWidget(req, res) {
  //   console.log('server side delete widget');
  //   var widgetId = req.params.widgetId;
  //   for (var i = 0; i < widgets.length; i++) {
  //     if (widgets[i]._id === widgetId) {
  //       res.json(widgets[i]);
  //       widgets.splice(i, 1);
  //       return;
  //     }
  //   }
  //   res.status(404).send("Widget ID cannot be found.");
  // }

  function reorderWidgets(req, res) {
    console.log('server side reorder widget-----------------');
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);

    console.log('startIndex = ' + startIndex);
    console.log('endIndex = ' + endIndex);
    widgetModel
      .reorderWidgets(pageId, startIndex, endIndex)
      .then(function (stats) {
        console.log('stats= ' + stats);
        res.sendStatus(200);
      }, function (err) {
        res.sendStatus(400).send(err);
      });
  }

  // function orderWidgets(req, res) {
  //   console.log('server side order widget');
  //   var pageId = req.params.pageId;
  //   var start = parseInt(req.query.initial);
  //   var end = parseInt(req.query.final);
  //
  //   // console.log('pageId = ' + pageId);
  //   moveWidget(widgets, start, end);
  //
  //   res.sendStatus(200);
  // }

  function moveWidget(widgets, startIndex, endIndex) {
    while (startIndex < 0) {
      startIndex = startIndex + widgets.length;
    }
    while (endIndex < 0) {
      endIndex = endIndex + widgets.length;
    }

    if (endIndex >= widgets.length) {
      var k = endIndex - widgets.length + 1;
      while (k--) {
        widgets.push(undefined);
      }
    }
    widgets.splice(endIndex, 0, widgets.splice(startIndex, 1)[0]);
    // return widgets;
    console.log('new widget = ' + widgets);
  }


  // widgets = [
  //   {
  //     //widget id
  //     _id: "999",
  //     widgetType: "TEXT",
  //     name: 'why its empty',
  //     pageId: "321",
  //     size: "55",
  //     text: "This is header",
  //     url: "",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: 'whats that'
  //   },
  //   {
  //     _id: "123",
  //     widgetType: "HEADER",
  //     name: ' ',
  //     pageId: "321",
  //     size: "2",
  //     text: "GIZMODO",
  //     url: "",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "234",
  //     widgetType: "HEADER",
  //     name: ' ',
  //     pageId: "321",
  //     size: "4",
  //     text: "Lorem ipsum",
  //     url: "",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   // { _id: "345", widgetType: "IMAGE", pageId: "321", size: "", text: "", width: "100%", url: "http://lorempixel.com/400/200/" },
  //   {
  //     _id: '777',
  //     widgetType: 'IMAGE',
  //     name: 'new image',
  //     pageId: '321',
  //     size: '',
  //     text: 'This is xiaohua speaking!!!',
  //     // url: 'http://imgsrc.baidu.com/forum/w%3D580/sign=14b16fbbd562853592e0d229a0ee76f2/dc433a1f95cad1c82867e96e7f3e6709c83d51ac.jpg',
  //     url: 'http://a2.att.hudong.com/81/59/01300001255202131795598214211.jpg',
  //     width: '100%',
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "456",
  //     widgetType: "HTML",
  //     name: 'html name',
  //     pageId: "321",
  //     size: "",
  //     text: "666",
  //     url: "",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "333",
  //     widgetType: "IMAGE",
  //     name: 'IMAGE name',
  //     pageId: "321",
  //     size: "",
  //     text: "666",
  //     url: "/assets/uploads/0c4ae086e713e0df992f66581bcd47df",
  //     // url: "/assets/uploads/832774d6dfd8be90fba28c29571c6349",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "0001",
  //     widgetType: "IMAGE",
  //     name: 'IMAGE name',
  //     pageId: "321",
  //     size: "",
  //     text: "666",
  //     url: "/assets/uploads/2d66ab8458b9caff64895eb45aba5c1b",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "678",
  //     widgetType: "YOUTUBE",
  //     name: ' ',
  //     pageId: "321",
  //     size: "",
  //     text: "",
  //     url: "https://youtu.be/bzc86YRta0M",
  //     width: "100%",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   },
  //   {
  //     _id: "789",
  //     widgetType: "HTML",
  //     name: 'what is the html name?',
  //     pageId: "321",
  //     size: "<p>Lorem ipsum</p>",
  //     text: "",
  //     url: "",
  //     width: "",
  //     height: 100,
  //     rows: 0,
  //     class: '',
  //     icon: '',
  //     deletable: false,
  //     formatted: false,
  //     placeholder: ''
  //   }
  // ];

}


