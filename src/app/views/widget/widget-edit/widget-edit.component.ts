import {Component, OnInit} from '@angular/core';
// import {Widget} from '../../../model/widget.model.client';
import {WidgetService} from '../../../service/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../service/page.service.client';
// import {Page} from '../../../model/page.model.client';
// import {Website} from '../../../model/website.model.client';
import {WebsiteService} from '../../../service/website.service.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widget: any = {};
  widgetId: String;
  userId: String;
  websiteId: String;
  pageId: String;

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private pageService: PageService,
              private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.widgetService.findWidgetById(params.wgid).subscribe(
          (widget: any) => {
            if (widget._page === params.pid) {
              this.pageService.findPageById(widget._page).subscribe(
                (page: any) => {
                  if (page._websiteId === params.wid) {
                    this.websiteService.findWebsitesById(page._websiteId).subscribe(
                      (website: any) => {
                        if (website.developerId === params.uid) {
                          this.userId = params.uid;
                          this.websiteId = params.wid;
                          this.pageId = params.pid;
                          this.widgetId = params.wgid;
                          this.widget = widget;
                          console.log('this is widget edit= ' + this.widget.type);
                          console.log('this is widget edit= ' + this.widget.name);
                        } else {
                          console.log('Two user ID does not match.');
                        }
                      }
                    );
                  } else {
                    console.log('Two Website ID does not match.');
                  }
                }
              );
            }
          }
        );
      }
    );
    console.log('type          widget-edit widget type = ' + this.widget.widgetType);
    console.log('url           widget-edit url = ' + this.widget.url);
    console.log('text          widget-edit text = ' + this.widget.text);
  }

}
