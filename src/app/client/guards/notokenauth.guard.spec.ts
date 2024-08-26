import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notokenauthGuard } from './notokenauth.guard';

describe('notokenauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notokenauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
