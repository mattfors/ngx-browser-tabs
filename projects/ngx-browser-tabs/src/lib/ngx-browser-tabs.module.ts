import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBrowserTabsComponent } from './ngx-browser-tabs.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestComponentComponent } from './test-component/test-component.component';



@NgModule({
  declarations: [
    NgxBrowserTabsComponent,
    TestComponentComponent,
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
