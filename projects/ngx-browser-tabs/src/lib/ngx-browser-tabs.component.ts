import { Component, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestComponentComponent } from './test-component/test-component.component';

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
          {{tab.title}} <span class="tab-remove" (click)="removeTab(i)">&#215;</span>
      </div>
      <div class="tab-add" (click)="addNewTab()">
        +
      </div>
    </div>
    <ng-template #tabOutlet ></ng-template>
    {{this.tabs | json}}
    <div class="tab-context-menu" [ngStyle]="getRightClickMenuStyle()" *ngIf="isDisplayContextMenu">
      <button (click)="addNewTab()">New Tab</button>
      <hr>
      <button (click)="removeTab(contextIndex)">Close</button>
    </div>
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
      padding: 5px;
      color: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
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
      width: 100px;
      padding: 10px;
      border-radius: 5px;
    }
  `]
})
export class NgxBrowserTabsComponent implements OnInit {

  tabs = [{title: 'Tab 1', state:{timeCreate: new Date()}}, {title: 'Tab 2'}, {title: 'Tab 3'}, {title: 'Tab 4'}]
  selectedIndex = 0;
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;
  isDisplayContextMenu: boolean = true;
  contextIndex: number;

  @ViewChild('tabOutlet', { read: ViewContainerRef, static: true })
  tabOutlet: ViewContainerRef;

  componentRef: ComponentRef<BrowserTabState>;

  constructor() { }

  ngOnInit(): void {
    this.selectTab(0);
  }

  selectTab(index: number): void {
    if (this.tabs[this.selectedIndex]) {
      this.tabs[this.selectedIndex].state = this.componentRef?.instance.saveState();
    }
    this.selectedIndex = index;
    this.tabOutlet.clear()
    this.componentRef = this.tabOutlet.createComponent<BrowserTabState>(TestComponentComponent)
    this.componentRef.instance.restoreState(this.tabs[index].state)
  }

  removeTab(index: number): void {
    this.tabs.splice(index, 1)
    if (index <= this.selectedIndex) {
      this.selectedIndex--;
      this.selectTab(this.selectedIndex--);
    }
  }

  addNewTab(): void {
    this.tabs.push({title: 'New Tab'})
    this.selectTab(this.tabs.length - 1);
  }

  dropTab(event: CdkDragDrop<any>): void {
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedIndex = event.currentIndex;
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

export declare interface BrowserTabState {
  saveState(): any;
  restoreState(state: any): void;
}
