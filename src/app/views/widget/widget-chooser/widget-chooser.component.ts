import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WidgetService} from '../../../service/widget.service.client';
import {Widget} from '../../../model/widget.model.client';

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
  newWidget: Widget = {
    _id: '', widgetType: '', pageId: '', size: '1', text: 'text', url: 'url', width: '100%'
  };

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['uid'];
        this.pageId = params['pid'];
      }
    );
  }

  createNewWidget(widgetType: String) {
    this.newWidget.widgetType = widgetType;
    this.widgetService.createWidget(this.pageId, this.newWidget);
    console.log('new widget.type= ' + this.newWidget.widgetType);
    const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.newWidget._id;
    this.router.navigate([url]);
  }
}
