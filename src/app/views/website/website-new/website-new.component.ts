import {Component, OnInit} from '@angular/core';
import {WebsiteService} from '../../../service/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../model/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  // websiteId: String;
  websites: Website[] = [];
  // _id: String;
  // name: String;
  // developId: String;
  // description: String;
  newWebsite: Website = {_id: '', name: '', developerId: '', description: ''};

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        // this.websiteId = params['wid'];
      }
    );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  createNewWebsite(newWebsite) {
    console.log('hello create new website');
    console.log('website new----- new website name= ' + newWebsite.name);
    console.log('website new----- new website description =' + newWebsite.description);
    newWebsite.developerId = this.userId;
    this.websiteService.createWebsite(this.userId, newWebsite);
    const url: String = '/user/' + this.userId + '/website';
    console.log('new website -------- url = ' + url);
    this.router.navigate([url]);
    // console.log('size= ' + this.websites.length);
  }
}

