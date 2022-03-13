import { TestBed } from '@angular/core/testing';

import { NgxBrowserTabsService } from './ngx-browser-tabs.service';

describe('NgxBrowserTabsService', () => {
  let service: NgxBrowserTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBrowserTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
