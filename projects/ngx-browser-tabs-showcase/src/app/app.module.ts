import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxBrowserTabsModule } from '../../../ngx-browser-tabs/src/lib/ngx-browser-tabs.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxBrowserTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
