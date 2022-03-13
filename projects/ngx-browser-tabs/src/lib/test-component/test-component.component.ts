import { Component, OnInit } from '@angular/core';
import { BrowserTab } from '../ngx-browser-tabs.component';

@Component({
  selector: 'lib-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit, BrowserTab {

  timeCreate: Date;

  constructor() { }

  ngOnInit(): void {
  }

  restoreState(state: any): void {
    this.timeCreate = state?.timeCreate ||  new Date();
  }

  saveState(): any {
    return {timeCreate: this.timeCreate};
  }

}
