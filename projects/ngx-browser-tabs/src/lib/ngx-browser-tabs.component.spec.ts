import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBrowserTabsComponent } from './ngx-browser-tabs.component';

describe('NgxBrowserTabsComponent', () => {
  let component: NgxBrowserTabsComponent;
  let fixture: ComponentFixture<NgxBrowserTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxBrowserTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBrowserTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
