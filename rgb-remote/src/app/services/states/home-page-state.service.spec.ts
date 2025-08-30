import { TestBed } from '@angular/core/testing';

import { HomePageState } from './home-page-state.service';

describe('HomePageState', () => {
  let service: HomePageState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
