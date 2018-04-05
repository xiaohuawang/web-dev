import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {Widget} from '../../../../model/widget.model.client';
import {WidgetService} from '../../../../service/widget.service.client';
import {WebsiteService} from '../../../../service/website.service.client';
import {PageService} from '../../../../service/page.service.client';
import {UserService} from '../../../../service/user.service.client';
// import {Page} from '../../../../model/page.model.client';
// import {Website} from '../../../../model/website.model.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  // widget: Widget = {
  //   _id: '', widgetType: '', name: '', pageId: '', size: '1', text: '', url: '', width: '100%',
  //   height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  // };
  widget: any = {};
  pageId: String;
  widgetId: String;
  userId: String;
  websiteId: String;


  constructor(private widgetService: WidgetService, private pageService: PageService, private websiteService: WebsiteService,
              private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        // console.log(1);
        this.widgetService.findWidgetById(params.wgid).subscribe(
          (widget: any) => {
            // console.log(2);
            if (widget._page === params.pid) {
              // console.log(3);
              this.pageService.findPageById(widget._page).subscribe(
                (page: any) => {
                  if (page._websiteId === params.wid) {
                    this.websiteService.findWebsitesById(page._websiteId).subscribe(
                      (website: any) => {
                        if (website.developerId === params.uid) {
                          // console.log(4);
                          this.userId = params.uid;
                          this.websiteId = params.wid;
                          this.pageId = params.pid;
                          this.widgetId = params.wgid;
                          this.widget = widget;
                          console.log('widget html= ' + this.widget.type);
                        } else {
                          console.log('User ID does not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Website ID does not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('This is html widget--------------------');
    console.log('widget type = ' + this.widget.widgetType);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (widget: any) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        console.log('delet html widget ts url = ' + url);
        // this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  updateWidget(widget: any) {
    this.widgetService.updateWidget(this.widgetId, widget).subscribe(
      (widget: any) => {
        console.log('good');
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
