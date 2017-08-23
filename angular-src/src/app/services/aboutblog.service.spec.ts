/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AboutblogService } from './aboutblog.service';

describe('AboutblogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutblogService]
    });
  });

  it('should ...', inject([AboutblogService], (service: AboutblogService) => {
    expect(service).toBeTruthy();
  }));
});
