import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';

describe('SignUpService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
