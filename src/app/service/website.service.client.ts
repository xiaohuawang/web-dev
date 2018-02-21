import {Website} from '../model/website.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class WebsiteService {

  websites: Website[] = [
    {_id: '123', name: 'Facebook', developerId: '456', description: 'Lorem'},
    {_id: '234', name: 'Tweeter', developerId: '456', description: 'Lorem'},
    {_id: '456', name: 'Gizmodo', developerId: '456', description: 'Lorem'},
    {_id: '890', name: 'Go', developerId: '123', description: 'Lorem'},
    {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
    {_id: '678', name: 'Checkers', developerId: '123', description: 'Lorem'},
    {_id: '789', name: 'Chess', developerId: '234', description: 'Lorem'}
  ];

  // createWebsite(userId: String, website: Website) {
  //
  //   const new_website = {
  //     _id: (new Date()).getTime() + '',
  //     name: website.name,
  //     developId: website.developerId,
  //     description: website.description
  //   };
  //
  //   this.websites.push(new_website);
  // }

  createWebsite(userId: String, website: any) {
    website._id = Math.random().toString();
    website.developerId = userId;
    this.websites.push(website);
  }


  findWebsitesByUser(userId: String) {
    const resultSet = [];
    for (const i in this.websites) {
      if (this.websites[i].developerId === userId) {
        resultSet.push(this.websites[i]);
      }
    }
    return resultSet;
  }

  findWebsitesByUser2(userId: String) {
    return this.websites.filter(function (website) {
      return website.developerId === userId;
    });
  }

  findWebsitesById(websiteId: String) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId: String, website: Website) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i].name = website.name;
        this.websites[i].description = website.description;
      }
    }
  }

  deleteWebsite(websiteId: String) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        const j = +i;
        this.websites.splice(j, 1);
      }
    }
  }
}
