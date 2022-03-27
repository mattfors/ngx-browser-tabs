import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarUiComponent } from './tab-bar-ui.component';

describe('NbtTabBarUiComponent', () => {
  let component: TabBarUiComponent;
  let fixture: ComponentFixture<TabBarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBarUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
