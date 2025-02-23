import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { newGuard } from './new.guard';

describe('newGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => newGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
