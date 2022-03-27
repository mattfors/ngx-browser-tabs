import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBrowserTabsComponent } from './ngx-browser-tabs.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserTabBarComponent } from './browser-tab-bar/browser-tab-bar.component';
import { NbtContextMenuUiComponent } from './context-menu/nbt-context-menu-ui.component';
import { TabBarUiComponent } from './tab-bar-ui/tab-bar-ui.component';



@NgModule({
  declarations: [
    NgxBrowserTabsComponent,
    BrowserTabBarComponent,
    NbtContextMenuUiComponent,
    TabBarUiComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    NgxBrowserTabsComponent
  ]
})
export class NgxBrowserTabsModule { }
