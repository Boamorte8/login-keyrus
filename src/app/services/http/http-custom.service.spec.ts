import { TestBed } from '@angular/core/testing';

import { HttpCustomService } from './http-custom.service';

describe('HttpCustomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCustomService = TestBed.get(HttpCustomService);
    expect(service).toBeTruthy();
  });
});
