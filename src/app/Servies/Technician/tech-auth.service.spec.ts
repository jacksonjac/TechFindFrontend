import { TestBed } from '@angular/core/testing';

import { TechAuthService } from './tech-auth.service';

describe('TechAuthService', () => {
  let service: TechAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
