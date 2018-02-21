import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import {Widget} from '../../../model/widget.model.client';
import {WidgetService} from '../../../service/widget.service.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgets: Widget[] = [];

  constructor(private widgetService: WidgetService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['uid'];
        this.pageId = params['pid'];
      }
    );
    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
  }

  modifyYoutubeUrl(url) {
    // console.log('youtube url before = ' + url);
    const youtubeUrl = url.replace('youtu.be', 'youtube.com/embed');
    // console.log('youtube url= ' + youtubeUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
  }
}
