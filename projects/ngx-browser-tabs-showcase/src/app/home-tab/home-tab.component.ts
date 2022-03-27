import { Component } from '@angular/core';
import { NgxBrowserTabsService } from '../../../../ngx-browser-tabs/src/lib/ngx-browser-tabs.service';
import { CounterTabComponent } from '../counter-tab/counter-tab.component';
import { IframeTabComponent } from '../iframe-tab/iframe-tab.component';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss']
})
export class HomeTabComponent {

  title = '';
  componentOptions = [HomeTabComponent, CounterTabComponent, IframeTabComponent];

  constructor(private ngxBrowserTabsService: NgxBrowserTabsService) {
  }

  addTab(component: any){
    this.ngxBrowserTabsService.addTab({title: component.name, component: component})
    return false;
  }

}
