import { TestBed } from '@angular/core/testing';

import { UserChatServicesService } from './chat-servies.service';

describe('ChatServiesService', () => {
  let service: UserChatServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChatServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
