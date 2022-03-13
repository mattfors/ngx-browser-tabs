import { Component, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TestComponentComponent } from './test-component/test-component.component';
import { NgxBrowserTabsService } from './ngx-browser-tabs.service';

@Component({
  selector: 'lib-ngx-browser-tabs',
  template: `
    <div class="tab-container"
         cdkDropList
         cdkDropListOrientation="horizontal"
         (cdkDropListDropped)="dropTab($event)">
      <div
        cdkDrag class="tab"
        [class.tab-selected]="selectedIndex === i"
        *ngFor="let tab of tabs; index as i"
        (click)="selectTab(i)"
        (contextmenu)="tabRightClick(i, $event)">
        {{tab.title}} <span class="tab-remove" (click)="close(i)">&#215;</span>
      </div>
      <div class="tab-add" (click)="addNewTab()">
        +
      </div>
      <div class="tab-context-menu" [ngStyle]="getRightClickMenuStyle()" *ngIf="isDisplayContextMenu">
        <ul class="tab-context-menu-list">
          <li class="tab-context-menu-item-enabled" (click)="addNewTab()">
            New Tab
          </li>
          <hr>
          <li class="tab-context-menu-item-enabled" (click)="close(contextIndex)">
            Close
          </li>
          <li (click)="closeOther(contextIndex)" [ngClass]="tabs.length === 1 ? 'tab-context-menu-item-disabled' : 'tab-context-menu-item-enabled'">
            Close Other Tabs
          </li>
          <li (click)="closeToRight(contextIndex)" [ngClass]="contextIndex === tabs.length - 1 ? 'tab-context-menu-item-disabled' : 'tab-context-menu-item-enabled'">
            Close Tabs to the Right
          </li>
        </ul>
      </div>
    </div>

    <table>
      <tr>
        <th>title</th><th>time create</th>
      </tr>
      <tr *ngFor="let tab of tabs; index as i">
        <td>{{tab.title}}</td><td>{{tab?.state?.timeCreate}}</td>
      </tr>

    </table>
    <ng-template #tabOutlet></ng-template>
    {{this.tabs | json}}
  `,
  styles: [`
    .tab-container {
      display: flex;
      background-color: #313131;
      height: 30px;
      column-gap: 5px;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      //padding: 5px;
      padding-left: 5px;
      color: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      border-bottom: 5px #313131 solid;
      border-top: 5px #313131 solid;
    }

    .tab {
      max-width: 150px;
      line-height: 30px;
      padding-left: 10px;
      padding-right: 5px;
      display: flex;
      border-radius: 5px;
      justify-content: space-between;
      flex: 1 1 auto;
      overflow-y: hidden;
    }

    .tab-selected {
      background: rgba(255, 255, 255, 0.2);
    }

    .tab:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .tab-remove {
      margin-top: 5px;
      margin-bottom: 5px;
      line-height: 20px;
      width: 20px;
      border-radius: 5px;
      text-align: center;
    }

    .tab-remove:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .tab-add {
      line-height: 30px;
      width: 30px;
      border-radius: 5px;
      text-align: center;
    }

    .tab-add:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .cdk-drag-preview {
      color: white;
      background: rgba(255, 255, 255, 0.5);
    }

    .cdk-drag-placeholder {
      color: transparent;
      background: rgba(255, 255, 255, 0.2);
    }

    .tab-context-menu {
      color: white;
      background-color: #313131;
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 200px;
      padding: 10px;
      border-radius: 5px;
    }

    ul.tab-context-menu-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    ul.tab-context-menu-list li {
      border-radius: 5px;
      margin-bottom: 5px;
      padding: 5px;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .tab-context-menu-item-enabled:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .tab-context-menu-item-disabled {
      color: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class NgxBrowserTabsComponent implements OnInit {

  tabs = [{title: 'Tab 1', state:{timeCreate: new Date()}}, {title: 'Tab 2'}, {title: 'Tab 3'}, {title: 'Tab 4'}]
  selectedIndex = 0;
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;
  isDisplayContextMenu: boolean;
  contextIndex: number;

  @ViewChild('tabOutlet', { read: ViewContainerRef, static: true })
  tabOutlet: ViewContainerRef;

  componentRef: ComponentRef<BrowserTab>;

  testTabCounter = 1;

  constructor(private ngxBrowserTabsService: NgxBrowserTabsService) { }

  ngOnInit(): void {
    this.tabs = this.ngxBrowserTabsService.tabs;
    this.ngxBrowserTabsService.selectedIndex.subscribe(i => this.selectedIndex = i);

    this.ngxBrowserTabsService.tabSelected.subscribe(t => {
      this.tabOutlet.clear()
      this.componentRef = this.tabOutlet.createComponent<BrowserTab>(TestComponentComponent)
      this.componentRef.instance.restoreState(t?.state);
    });

    this.ngxBrowserTabsService.saveStateCallback = () => {
      if (this.componentRef) {
        return this.componentRef.instance.saveState();
      }
    };

    for(let i = 0; i <6; i++) {
      this.addNewTab();
    }
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

  addNewTab(): void {
    this.ngxBrowserTabsService.addTab({title: 'New Tab ' + this.testTabCounter++});
  }

  dropTab(event: CdkDragDrop<any>): void {
    this.ngxBrowserTabsService.moveTab(event.previousIndex, event.currentIndex)
  }

  tabRightClick(index:number, event: any): boolean {
    this.contextIndex = index;
    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;
    this.isDisplayContextMenu = true;
    return false;
  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }

}

export declare interface BrowserTab {
  saveState(): any;
  restoreState(state: any): void;
}
