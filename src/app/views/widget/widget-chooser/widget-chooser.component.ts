import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WidgetService} from '../../../service/widget.service.client';
// import {Widget} from '../../../model/widget.model.client';
// import {Website} from '../../../model/website.model.client';
// import {Page} from '../../../model/page.model.client';
import {WebsiteService} from '../../../service/website.service.client';
import {PageService} from '../../../service/page.service.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  // global variable
  userId: String;
  websiteId: String;
  pageId: String;
  widgets: any[];
  // newWidget: Widget = {
  //   _id: '', widgetType: '', name: 'name', pageId: '', size: '', text: '', url: '', width: '100%',
  //   height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
  // };

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private websiteService: WebsiteService,
              private pageService: PageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.pageService.findPageById(params.pid).subscribe(
          (page: any) => {
            if (page._websiteId === params.wid) {
              this.websiteService.findWebsitesById(page._websiteId).subscribe(
                (website: any) => {
                  if (website.developerId === params.uid) {
                    this.userId = params.uid;
                    this.websiteId = params.wid;
                    this.pageId = params.pid;
                    this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
                      (widgets: any[]) => {
                        this.widgets = widgets;
                        console.log('widget chooser len= ' + this.widgets.length);
                      }
                    );
                  } else {
                    console.log('Two User ID do not match.');
                  }
                }
              );
            } else {
              console.log('Two website ID do not match.');
            }
          }
        );
      }
    );
  }

  // createNewWidget(widgetType: String) {
  //   this.newWidget.widgetType = widgetType;
  //   this.widgetService.createWidget(this.pageId, this.newWidget);
  //   console.log('new widget.type= ' + this.newWidget.widgetType);
  //   const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.newWidget._id;
  //   this.router.navigate([url]);
  // }

  createNewWidget(widgetType: String) {
    // this.newWidget.widgetType = widgetType;
    const newWidget: any = {
      type: widgetType, name: 'name', size: 1, width: '100%',
      height: '100%', rows: 0, deletable: false, formatted: false, placeholder: '',
      position: this.widgets.length
    };
    this.widgetService.createWidget(this.pageId, newWidget).subscribe(
      (widget: any) => {
        const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widget._id;
        console.log('new widget.type= ' + newWidget.type);
        console.log('new widget url = ' + url);
        this.router.navigate([url]);
      },
      (error: any) => {
        console.log(error);
      }
    );
    // console.log('new widget.type= ' + this.newWidget.widgetType);
    // const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.newWidget._id;
    // this.router.navigate([url]);
  }
}
