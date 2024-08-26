import { TestBed } from '@angular/core/testing';

import { TechChatserviceService } from './chatservice.service';

describe('ChatserviceService', () => {
  let service: TechChatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechChatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
