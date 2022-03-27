import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserTabBarComponent } from './browser-tab-bar.component';

describe('BrowserTabBarComponent', () => {
  let component: BrowserTabBarComponent;
  let fixture: ComponentFixture<BrowserTabBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserTabBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
