import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../service/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../model/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  // newPage: Page [] = [];
  newPage: Page = {_id: '', name: '', websiteId: '', description: ''};

  constructor(private router: Router, private pageService: PageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
  }

  createNewPage(page) {
    if (page.name !== '' && page.description !== '') {
      console.log('page new -------- page name= ' + page.name);
      console.log('page new -------- page description= ' + page.description);
      this.pageService.createPage(this.websiteId, page);
      const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page'
      console.log('page new -------- url = ' + url);
      this.router.navigate([url]);
    }
  }
}


