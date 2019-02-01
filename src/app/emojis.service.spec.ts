import { TestBed } from '@angular/core/testing';

import { EmojisService } from './emojis.service';

describe('EmojisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmojisService = TestBed.get(EmojisService);
    expect(service).toBeTruthy();
  });
});
