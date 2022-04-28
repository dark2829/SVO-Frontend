import { TestBed } from '@angular/core/testing';

import { GuardLoginGuard } from './guard-login.guard';

describe('GuardLoginGuard', () => {
  let guard: GuardLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
