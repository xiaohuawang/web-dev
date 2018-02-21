import {Page} from '../model/page.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class PageService {
  // pages: Page[] = [
  //   {'_id': '3', 'name': 'Post 1', 'websiteId': '4', 'description': 'Lorem'},
  //   {'_id': '4', 'name': 'Post 2', 'websiteId': '4', 'description': 'Lorem'},
  //   {'_id': '5', 'name': 'Post 3', 'websiteId': '4', 'description': 'Lorem'},
  //   {'_id': '1', 'name': 'Post 4', 'websiteId': '3', 'description': 'Lorem'},
  //   {'_id': '2', 'name': 'Post 5', 'websiteId': '2', 'description': 'Lorem'}
  // ];

  pages: Page[] = [
    {_id: '321', name: 'Post 1', websiteId: '456', description: 'Lorem'},
    {_id: '432', name: 'Post 2', websiteId: '456', description: 'Lorem'},
    {_id: '543', name: 'Post 3', websiteId: '456', description: 'Lorem'}

  ];

  dumpPage() {
    return new Page(undefined, undefined, undefined, undefined);
  }

  copyPage(page: Page) {
    if (!page) {
      return undefined;
    }
    return new Page(page._id, page.name, page.websiteId, page.description);
  }

  createPage(websiteId: String, page: Page) {
    // console.log('before created = ' + this.pages.length);
    const createdPage = new Page(String(this.pages.length + 1), page.name, websiteId, page.description);
    this.pages.push(createdPage);
    // console.log('after created = ' + this.pages.length);
    return this.copyPage(createdPage);
  }

  findPageByWebsiteId(websiteId: String) {
    const resultSet = [];
    for (const page of this.pages) {
      if (page.websiteId === websiteId) {
        resultSet.push(this.copyPage(page));
      }
      // console.log('resultset size= ' + resultSet.length);
    }
    return resultSet;
  }

  findPageById(pageId: String) {
    const foundPage = this.pages.find(function (page) {
      return page._id === pageId;
    });
    return this.copyPage(foundPage);
  }

  // updatePage(pageId: String, page: Page) {
  //   const foundPage = this.pages.find(function (page) {
  //     return page._id === pageId;
  //   });
  //   foundPage.name = page.name;
  //   foundPage.description = page.description;
  //   return this.copyPage(foundPage);
  // }

  updatePage(pageId: String, page: any) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pageId) {
        this.pages[x].name = page.name;
        this.pages[x].description = page.title;
      }
    }
  }

  deletePage(pageId: String) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        const j = +i;
        this.pages.splice(j, 1);
      }
    }
  }

}
