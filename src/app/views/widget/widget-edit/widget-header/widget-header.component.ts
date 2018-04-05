import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {Widget} from '../../../../model/widget.model.client';
import {WidgetService} from '../../../../service/widget.service.client';
import {PageService} from '../../../../service/page.service.client';
// import {Page} from '../../../../model/page.model.client';
import {WebsiteService} from '../../../../service/website.service.client';

// import {Website} from '../../../../model/website.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: String;
  websiteId: String;
  widgetId: String;
  pageId: String;
  // widget: Widget = {
  //   _id: '', widgetType: '', name: 'name', pageId: '', size: '1', text: '', url: '', width: '100%',
  //   height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  // };
  widget: any = {};

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService,
              private pageService: PageService,
              private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.widgetService.findWidgetById(params.wgid).subscribe(
          (widget: any) => {
            console.log('1');
            if (widget._page === params.pid) {
              console.log('2');
              this.pageService.findPageById(widget._page).subscribe(
                (page: any) => {
                  if (page._websiteId === params.wid) {
                    console.log('3');
                    this.websiteService.findWebsitesById(page._websiteId).subscribe(
                      (website: any) => {
                        if (website.developerId === params.uid) {
                          console.log('4');
                          this.userId = params.uid;
                          this.websiteId = params.wid;
                          this.pageId = params.pid;
                          this.widgetId = params.wgid;
                          this.widget = widget;
                          console.log('widget-header widget id= ' + widget._id);
                        } else {
                          console.log('Two user id do not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Two website id do not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('widget header widget type = ' + this.widget.widgetType);
    // this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  // updateWidget(widget) {
  //   console.log('hello this is update widget');
  //   console.log('widget text= ' + this.widget.text);
  //   console.log('widget size=' + this.widget.size);
  //   this.widgetService.updateWidget(this.widgetId, this.widget);
  //   const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
  //   this.router.navigate([url]);
  // }

  updateWidget(widget: any) {
    console.log('this is update header widget in ts');
    this.widgetService.updateWidget(this.widgetId, widget).subscribe(
      (widget: any) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  // deleteWidget() {
  //   console.log('this is delete widgte!!!');
  //   this.widgetService.deleteWidget(this.widgetId);
  //   const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
  //   this.router.navigate([url]);
  // }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (widget: any) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
