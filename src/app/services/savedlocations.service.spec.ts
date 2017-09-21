import { TestBed, inject } from '@angular/core/testing';

import { SavedlocationsService } from './savedlocations.service';

describe('SavedlocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedlocationsService]
    });
  });

  it('should be created', inject([SavedlocationsService], (service: SavedlocationsService) => {
    expect(service).toBeTruthy();
  }));
});
