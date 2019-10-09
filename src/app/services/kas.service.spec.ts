import { TestBed } from '@angular/core/testing';

import { KasService } from './kas.service';

describe('KasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KasService = TestBed.get(KasService);
    expect(service).toBeTruthy();
  });
});
