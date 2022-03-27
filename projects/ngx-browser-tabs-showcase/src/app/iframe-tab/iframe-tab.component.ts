import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BrowserTab } from '../../../../ngx-browser-tabs/src/lib/ngx-browser-tabs.component';

@Component({
  selector: 'app-iframe-tab',
  templateUrl: './iframe-tab.component.html',
  styleUrls: ['./iframe-tab.component.scss']
})
export class IframeTabComponent implements OnInit, BrowserTab {

  @Input()
  url: string = "https://www.google.com";
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  restoreState(state: any): void {
  }

  saveState(): any {
  }


}
