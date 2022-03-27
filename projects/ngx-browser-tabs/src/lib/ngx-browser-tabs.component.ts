import { Component, ComponentRef, Input, NgZone, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NbtTab, NgxBrowserTabsService } from './ngx-browser-tabs.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-ngx-browser-tabs',
  template: `
    <lib-browser-tab-bar
      [tabs]="tabs"
      [selectedIndex]="selectedIndex"
      (tabClick)="selectTab($event)"
      (tabClose)="close($event)"
      (add)="addNewTab()"
      (closeOther)="closeOther($event)"
      (closeToRight)="closeToRight($event)"
      (tabDropped)="dropTab($event)"
    > </lib-browser-tab-bar>
    <ng-template #tabOutlet></ng-template>
  `,
  styles: [`

  `]
})
export class NgxBrowserTabsComponent {

  @Input() defaultComponentType: Type<any>;


  componentRef: ComponentRef<any>;

  tabs: NbtTab[]  = [];
  selectedIndex = 0;

  @ViewChild('tabOutlet', { read: ViewContainerRef, static: true })
  tabOutlet: ViewContainerRef;

  constructor(private ngxBrowserTabsService: NgxBrowserTabsService, private zone: NgZone) {

  }

  ngOnInit(): void {
    this.tabs = this.ngxBrowserTabsService.tabs;
    this.ngxBrowserTabsService.selectedIndex.subscribe(i => this.selectedIndex = i);
    this.ngxBrowserTabsService.tabSelected.subscribe(t => this.createComponent(t));
    this.ngxBrowserTabsService.saveStateCallback = () => {
      if (this.componentRef && this.componentRef.instance.saveState instanceof Function) {
        return this.componentRef.instance.saveState();
      }
    };
    this.addNewTab();
  }

  createComponent(t: NbtTab): void {
    this.tabOutlet.clear()
    this.componentRef = this.tabOutlet.createComponent<any>(t.component)
    if (this.componentRef.instance.restoreState instanceof Function) {
      this.componentRef.instance.restoreState(t?.data);
    }
  }

  addNewTab(): void {
    this.ngxBrowserTabsService.addTab({title: 'New Tab', component: this.defaultComponentType});
  }

  selectTab(index: number): void {
    this.ngxBrowserTabsService.selectTab(index);
  }

  close(index: number): void {
    this.ngxBrowserTabsService.close(index);
  }

  closeToRight(index: number): void {
    this.ngxBrowserTabsService.closeToRight(index);
  }

  closeOther(index: number): void {
    this.ngxBrowserTabsService.closeOther(index);
  }

  dropTab(event: CdkDragDrop<any>): void {
    this.ngxBrowserTabsService.moveTab(event.previousIndex, event.currentIndex)
  }

}

export declare interface BrowserTab {
  saveState(): any;
  restoreState(state: any): void;
}
