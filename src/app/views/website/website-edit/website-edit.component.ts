import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../model/website.model.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  website: Website;
  updatedWebsite: Website;
  websites: Website[] = [];
  websiteId: String;
  developerId: String;

  constructor(private activatedRoute: ActivatedRoute, private websiteService: WebsiteService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.developerId = params['uid'];
      }
    );
    this.websites = this.websiteService.findWebsitesByUser(this.developerId);
    this.updatedWebsite = this.websiteService.findWebsitesById(this.websiteId);
    // console.log('test-----' + this.updatedWebsite.name);
  }
  updateWebsite(updatedWebsite) {
    console.log('hello updateeeeeeeeee');
    console.log('website edit----- dev id = ' + this.developerId);
    console.log('website edit----- updatedWebsite name = ' + updatedWebsite.name);
    console.log('website edit----- updatedWebsite description = ' + updatedWebsite.description);

    if (updatedWebsite.name.trim() !== '') {
      updatedWebsite.developerId = this.developerId;
      this.websiteService.updateWebsite(updatedWebsite._id, updatedWebsite);
      const url: any = '/user/' + this.developerId + '/website';
      this.router.navigate([url]);
      console.log('website edit url= ' + url);
    }
  }
  deleteWebsite() {
    console.log('hello, here is the delete funcion');
    this.websiteService.deleteWebsite(this.websiteId);
    const url: String = '/user/' + this.developerId + '/website';
    this.router.navigate([url]);
  }
}
