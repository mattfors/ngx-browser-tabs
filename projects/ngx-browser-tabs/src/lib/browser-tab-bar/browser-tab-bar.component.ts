import { Component, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';
import { NbtTab, NgxBrowserTabsService } from '../ngx-browser-tabs.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TabRightClickEvent } from '../model/tab-right-click-event';

@Component({
  selector: 'lib-browser-tab-bar',
  templateUrl: './browser-tab-bar.component.html',
  styleUrls: ['./browser-tab-bar.component.css']
})
export class BrowserTabBarComponent {

  @Input() tabMaxWidth: number = 150;
  @Input() tabs: NbtTab[]  = [];
  @Input() selectedIndex: number = 0;

  @Output() tabClick = new EventEmitter<number>();
  @Output() tabClose = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();
  @Output() closeToRight = new EventEmitter<number>();
  @Output() closeOther = new EventEmitter<number>();
  @Output() tabDropped = new EventEmitter<CdkDragDrop<any>>();


  tabWidth = this.tabMaxWidth;

  isDisplayContextMenu: boolean;
  contextIndex: number;
  contextX: number;
  contextY: number;
  closeOtherEnabled: boolean
  closeToRightEnabled: boolean

  constructor(private ngxBrowserTabsService: NgxBrowserTabsService) {

  }

  showContextMenu(event: TabRightClickEvent): void {
    this.isDisplayContextMenu = true
    this.contextX = event.x;
    this.contextY = event.y;
    this.contextIndex = event.index
    this.closeOtherEnabled = this.tabs.length === 1;
    this.closeToRightEnabled = this.contextIndex === this.tabs.length - 1;
  }


  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }

}
