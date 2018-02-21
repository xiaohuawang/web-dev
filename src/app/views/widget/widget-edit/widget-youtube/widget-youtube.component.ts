import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../model/widget.model.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: Widget = {
    _id: '', widgetType: '', pageId: '', size: '', text: '', url: '', width: ''
  };

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

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

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
    const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
    this.router.navigate([url]);
  }

  updateWidget(widget: Widget) {
    this.widgetService.updateWidget(widget._id, widget);
    const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
    this.router.navigate([url]);
  }
}
