import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget = {
    _id: '', widgetType: '', pageId: '', size: '', text: '', url: '', width: ''
  };
  constructor(
    private widgetService: WidgetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid'];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
      }
    );
    this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  updateWidget() {
    this.widgetService.updateWidget(this.widgetId, this.widget);
    const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
    this.router.navigate([url]);
  }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
    this.router.navigate([url]);
  }
}
