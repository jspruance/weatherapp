import { TestBed, inject } from '@angular/core/testing';

import { SavedlocationsService } from './savedlocations.service';

import { HttpModule } from '@angular/http';

describe('SavedlocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [SavedlocationsService]
    });
  });

  it('should be created', inject([SavedlocationsService], (service: SavedlocationsService) => {
    expect(service).toBeTruthy();
  }));
});
