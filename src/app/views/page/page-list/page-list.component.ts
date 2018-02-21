import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PageService} from '../../../service/page.service.client';
import {Page} from '../../../model/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pages: Page[] = [];

  constructor(private pageService: PageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
    this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
  }
}
