import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbtContextMenuUiComponent } from './nbt-context-menu-ui.component';

describe('BrowserTabContextMenuComponent', () => {
  let component: NbtContextMenuUiComponent;
  let fixture: ComponentFixture<NbtContextMenuUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbtContextMenuUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbtContextMenuUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
