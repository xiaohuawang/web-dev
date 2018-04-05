var mongoose = require("mongoose");
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("PageModel", PageSchema);
var websiteModel = require("../website/website.model.server");
PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

// function createPage(websiteId, page) {
//   page._websiteId= websiteId;
//   return PageModel.create(page)
//     .then(function(responsePage){
//       websiteModel.findWebsiteById(websiteId)
//         .then(function(website){
//           website.pages.push(responsePage);
//           console.log(website)
//           return website.save();
//         });
//       return responsePage;
//     });
// }

function createPage(websiteId, page) {
  return PageModel.create(page)
  //.then(function()
}

// function createPage(websiteId, page) {
//   page._website = websiteId;
//   return Page.create(page);
// }


function findAllPagesForWebsite(websiteId) {
  return PageModel.find({_websiteId: websiteId})
}

// this one does not work
// function findPageById(pageId) {
//   return PageModel.find({_id: pageId})
// }

function findPageById(pageId) {
  return PageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return PageModel.update({_id: pageId}, page);
}

function deletePage(pageId) {
  return PageModel.findByIdAndRemove(pageId);
}
