import { TestBed } from '@angular/core/testing';

import { NaturalLanguageService } from './natural-language.service';

describe('NaturalLanguageService', () => {
  let service: NaturalLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturalLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
