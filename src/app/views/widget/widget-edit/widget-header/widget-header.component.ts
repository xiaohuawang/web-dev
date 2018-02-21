import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';
import {WidgetService} from '../../../../service/widget.service.client';

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
  widget: Widget = {
    _id: '', widgetType: '', pageId: '', size: '', text: '', url: '', width: ''
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
      }
    );
    this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

  updateWidget(widget) {
    console.log('hello this is update widget');
    console.log('widget text= ' + this.widget.text);
    console.log('widget size=' + this.widget.size);
    this.widgetService.updateWidget(this.widgetId, this.widget);
    const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
    this.router.navigate([url]);
  }

  deleteWidget() {
    console.log('this is delete widgte!!!');
    this.widgetService.deleteWidget(this.widgetId);
    const url: String = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/';
    this.router.navigate([url]);
  }
}
