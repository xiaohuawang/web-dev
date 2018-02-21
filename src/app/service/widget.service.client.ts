import { Widget } from '../model/widget.model.client';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetService {
  widgets: Widget[] = [
    { _id: '123', widgetType: 'HEADER', pageId: '321', size: '2', text: 'GIZMODO', url: '', width: '' },
    { _id: '234', widgetType: 'HEADER', pageId: '321', size: '4', text: 'This is yangyangnvw speaking!!!', url: '', width: '' },
    { _id: '345', widgetType: 'IMAGE', pageId: '321', size: '', text: 'This is xiaohua speaking!!!',
     url: 'http://lorempixel.com/400/200/', width: '100%'},
    { _id: '456', widgetType: 'HTML', pageId: '321', size: '', text: '<p>Lorem ipsum</p>', url: '', width: '' },
    { _id: '567', widgetType: 'HEADER', pageId: '321', size: '4', text: 'Where is Xiaomai ???', url: '', width: '' },
    { _id: '333', widgetType: 'IMAGE', pageId: '321', size: '4', text: 'IMAGE XIAOMAI',
      url: 'https://img.yqdown.com/img2015/9/16/2015091639600313.jpg', width: '100%' },
    { _id: '678', widgetType: 'YOUTUBE', pageId: '321', size: '', text: 'Lorem ipsum',
      url: 'https://youtu.be/bzc86YRta0M', width: '100%' },
    { _id: '789', widgetType: 'HTML', pageId: '321', size: '<p>Lorem ipsum</p>', text: 'Yangyang slhj zgntw', url: '', width: '' }
  ];

  api = {
    'createWidget': this.createWidget,
    'findWidgetsByPageId': this.findWidgetsByPageId,
    'findWidgetById': this.findWidgetById,
    'updateWidget': this.updateWidget,
    'deleteWidget': this.deleteWidget
  };
  createWidget(pageId: String, widget: any) {
    widget._id = Math.random().toString();
    widget.pageId = pageId;
    this.widgets.push(widget);
  }

  findWidgetsByPageId(pageId: String) {
    const resultSet: Widget[] = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pageId) {
        resultSet.push(this.widgets[x]);
      }
    }
    return resultSet;
  }

  findWidgetById(widgetId: String) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        return this.widgets[x];
      }
    }
  }

  updateWidget(widgetId: String, widget: any) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId && this.widgets[x].widgetType === widget.widgetType) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[x].text = widget.text;
            this.widgets[x].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[x].text = widget.text;
            this.widgets[x].url = widget.url;
            this.widgets[x].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[x].text = widget.text;
            this.widgets[x].url = widget.url;
            this.widgets[x].width = widget.width;
            return true;
        }
      }
    }
  }

  deleteWidget(widgetId: String) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {
        this.widgets.splice(x, 1);
      }
    }
  }
}
