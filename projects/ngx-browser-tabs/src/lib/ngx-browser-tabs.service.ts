import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class NgxBrowserTabsService {

  tabs: BrowserTabState[] = [];

  tabSelected = new Subject<BrowserTabState>();
  selectedIndex = new BehaviorSubject<number>(-1);

  saveStateCallback: () => any = () => {};

  constructor() { }

  selectTab(index: number): void {
      this.saveCurrentState();
      this.selectedIndex.next(index);
      this.tabSelected.next(this.tabs[index]);
  }

  close(index: number): void {
    this.saveCurrentState();
    this.tabs.splice(index, 1)
    if (index <= this.selectedIndex.value) {
      this.selectTab(this.selectedIndex.value - 1);
    }
  }

  closeOther(index: number): void {
    this.saveCurrentState();
    this.tabs.splice(index + 1, this.tabs.length - 1)
    this.tabs.splice(0, index)
    this.selectedIndex.next(0);
    this.tabSelected.next(this.tabs[0]);
  }

  closeToRight(index: number): void {
    this.saveCurrentState();
    this.tabs.splice(index + 1, this.tabs.length - 1)
    if (index <= this.selectedIndex.value) {
      this.selectedIndex.next(this.tabs.length - 1);
      this.tabSelected.next(this.tabs[this.tabs.length - 1]);
    }
  }

  moveTab(fromIndex: number, toIndex: number): void {
    this.saveCurrentState();
    moveItemInArray(this.tabs, fromIndex, toIndex);
    this.selectedIndex.next(toIndex);
    this.tabSelected.next(this.tabs[toIndex]);
  }

  addTab(tab: BrowserTabState): void {
    this.saveCurrentState();
    this.tabs.push(tab)
    this.selectTab(this.tabs.length - 1);
  }

  private saveCurrentState(): void {
    if (this.tabs[this.selectedIndex.value]) {
      this.tabs[this.selectedIndex.value].state = this.saveStateCallback();
    }
  }

}

export declare interface BrowserTabSelectedEvent {
  previousIndex: number;
  selectedTabState: BrowserTabState;
}

export declare interface BrowserTabState {
  title: string;
  state?: any;
}
