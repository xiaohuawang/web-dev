import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PageService} from '../../../service/page.service.client';
import {Page} from '../../../model/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  // properties
  userId: String;
  pageId: String;
  updatedPage: Page = {_id: '', name: '', websiteId: '', description: ''};
  // updatedPage: Page[] = [];
  name: String;
  websiteId: String;
  description: String;

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.pageId = params['pid'];
        this.websiteId = params['wid'];
      }
    );
    this.updatedPage = this.pageService.findPageById(this.pageId);
  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
    const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
    console.log('pgae-edit ---------- page url= ' + url);
    this.router.navigate([url]);
  }

  updatePage(page) {
    if (page.name !== '' && page.description !== '') {
      this.pageService.updatePage(page._id, page);
      const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
      this.router.navigate([url]);
    }
  }
}
