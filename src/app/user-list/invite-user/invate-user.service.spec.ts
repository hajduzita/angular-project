import { TestBed } from '@angular/core/testing';

import { InvateUserService } from './invate-user.service';

describe('InvateUserService', () => {
  let service: InvateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
