import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../model/page.model.client';
import {PageService} from '../../../service/page.service.client';
import {UserService} from '../../../service/user.service.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  // properties
  userId: String;
  pageId: String;
  // page: Page = {_id: '', name: '', websiteId: '', description: ''};
  // page: any = {};
  updatedPage: any = {};
  name: String;
  websiteId: String;
  description: String;

  constructor(private pageService: PageService,
              private userService: UserService,
              private websiteService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  // ngOnInit() {
  //   this.activatedRoute.params.subscribe(
  //     params => {
  //       this.pageService.findPageById(params.pid).subscribe(
  //         (page: any) => {
  //           console.log('pid= ' + params.pid);
  //           console.log('page._websiteId = ' + page._websiteId);
  //           console.log('page.name = ' + page.name);
  //           console.log('page.description = ' + page.description);
  //           if (page._websiteId === params.wid) {
  //             this.websiteService.findWebsitesById(page._websiteId).subscribe(
  //               (website: any) => {
  //                 if (website._user === params.uid) {
  //                   this.userId = params.uid;
  //                   this.pageId = params.pid;
  //                   this.websiteId = params.wid;
  //                   this.updatedPage = page;
  //                 } else {
  //                   // throw error message
  //                   console.log('Two user id do not match.');
  //                 }
  //               }
  //             );
  //           } else {
  //             // throw error message
  //             console.log('Two website id do not match');
  //           }
  //         }
  //       );
  //     }
  //   );
  // }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.pageService.findPageById(params['pid']).subscribe(
          (page: any) => {
            console.log('pid= ' + params['pid']);
            console.log('page.name = ' + page.name);
            console.log('page.name = ' + page._websiteId);
            console.log('page = ' + page.body);
            // this.page = page;
            this.userId = params.uid;
            this.pageId = params.pid;
            this.websiteId = params.wid;
            this.updatedPage = page;
          },
          (error: any) => {
            console.log(error);
          }
        );
      });
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe(
      (page: any) => {
        const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
    // const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
    // console.log('pgae-edit ---------- page url= ' + url);
    // this.router.navigate([url]);
  }

  updatePage(page) {
    if (page.name !== '' && page.description !== '') {
      this.pageService.updatePage(page._id, page).subscribe(
        (page: any) => {
          const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
          this.router.navigate([url]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
