import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxBrowserTabsModule } from '../../../ngx-browser-tabs/src/lib/ngx-browser-tabs.module';
import { HomeTabComponent } from './home-tab/home-tab.component';
import { CounterTabComponent } from './counter-tab/counter-tab.component';
import { IframeTabComponent } from './iframe-tab/iframe-tab.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeTabComponent,
    CounterTabComponent,
    IframeTabComponent
  ],
  imports: [
    BrowserModule,
    NgxBrowserTabsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }1
