import { Component } from '@angular/core';
import { HomeTabComponent } from './home-tab/home-tab.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-browser-tabs-showcase';
  HomeTabComponent = HomeTabComponent;
}
