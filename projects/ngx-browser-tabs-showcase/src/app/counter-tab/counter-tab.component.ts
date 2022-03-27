import { Component } from '@angular/core';
import { BrowserTab } from '../../../../ngx-browser-tabs/src/lib/ngx-browser-tabs.component';

@Component({
  selector: 'app-counter-tab',
  templateUrl: './counter-tab.component.html',
  styleUrls: ['./counter-tab.component.scss']
})
export class CounterTabComponent implements BrowserTab {

  counterValue: number = 0;
  increment() {
    this.counterValue++;
  }
  decrement() {
    this.counterValue--;
  }

  restoreState(state: any): void {
    this.counterValue = state || 0;
  }

  saveState(): any {
    return this.counterValue;
  }

}
