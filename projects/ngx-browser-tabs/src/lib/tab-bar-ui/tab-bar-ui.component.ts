import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { NbtTab } from '../ngx-browser-tabs.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TabRightClickEvent } from '../model/tab-right-click-event';

@Component({
  selector: 'nbt-tab-bar-ui',
  templateUrl: './tab-bar-ui.component.html',
  styleUrls: ['./tab-bar-ui.component.css']
})
export class TabBarUiComponent implements AfterViewInit, OnDestroy {

  @Input() tabMaxWidth: number = 150;
  @Input() tabs: NbtTab[]  = [];
  @Input() selectedIndex: number = 0;

  @Output() tabClick = new EventEmitter<number>();
  @Output() tabRightClick = new EventEmitter<TabRightClickEvent>();
  @Output() tabDropped = new EventEmitter<CdkDragDrop<any>>();
  @Output() add = new EventEmitter<void>();
  @Output() tabClose = new EventEmitter<number>();

  mouseOverContainer: boolean;
  tabWidth = this.tabMaxWidth;
  private observer: ResizeObserver;
  tabContainerWidth: number;

  @ViewChild('tabContainer',)
  tabContainer: ElementRef;

  @ViewChildren('tabElements')
  tabElements:  QueryList<any>;

  constructor(private zone: NgZone) { }

  ngAfterViewInit(): void {
    this.observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      this.zone.run(() => {
        this.tabContainerWidth = entries[0].contentRect.width;
      });
    });
    this.observer.observe(this.tabContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.tabContainer.nativeElement);
  }
  mouseEnterTab() {
    if (!this.mouseOverContainer) {
      if (this.tabElements.length > 0) {
        this.tabWidth = this.tabElements.first.nativeElement.offsetWidth - 15
      }
    }
    this.mouseOverContainer = true;
  }

  mouseLeaveTab(){
    this.mouseOverContainer = false;
    this.tabWidth = this.tabMaxWidth;
  }

  rightClick(index:number, event: any): boolean {
    this.tabRightClick.emit({index, x: event.clientX, y: event.clientY});
    return false;
  }

  close(index: number): void {
    this.tabClose.emit(index);
    if (this.tabs.length === index) {
      this.tabWidth = this.tabMaxWidth;
    }
  }

}
