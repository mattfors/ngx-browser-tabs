import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeTabComponent } from './iframe-tab.component';

describe('IframeTabComponent', () => {
  let component: IframeTabComponent;
  let fixture: ComponentFixture<IframeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
