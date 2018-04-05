import {Component, OnInit} from '@angular/core';
import {FlickrService} from '../../../../../service/flickr.service.client';
import {WidgetService} from '../../../../../service/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

import {PageService} from '../../../../../service/page.service.client';
import {WebsiteService} from '../../../../../service/website.service.client';
import {UserService} from '../../../../../service/user.service.client';

@Component({
  selector: 'app-flickr-image',
  templateUrl: './flickr-image.component.html',
  styleUrls: ['./flickr-image.component.css']
})
export class FlickrImageComponent implements OnInit {

  websiteId: string;
  pageId: string;
  userId: string;
  widgetId: string;
  photos: any[] = [{photo: ''}];
  error: string;
  searchText: string = '';
  widget: any;

  constructor(private flickrService: FlickrService,
              private widgetService: WidgetService,
              private pageService: PageService,
              private websiteService: WebsiteService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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
                          console.log('flick-image widget type= ' + this.widget.type);
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
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    this.widget.url = url;

    this.widgetService
      .updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId]);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }
}
