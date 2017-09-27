import { TestBed, inject } from '@angular/core/testing';

import { ValidateService } from './validate.service';

import { HttpModule } from '@angular/http';

describe('ValidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [ValidateService]
    });
  });

  it('should be created', inject([ValidateService], (service: ValidateService) => {
    expect(service).toBeTruthy();
  }));
});
