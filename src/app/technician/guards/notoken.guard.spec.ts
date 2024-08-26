import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notokenGuard } from './notoken.guard';

describe('notokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
