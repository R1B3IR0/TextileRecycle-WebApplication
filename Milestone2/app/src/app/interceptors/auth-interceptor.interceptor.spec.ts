import { TestBed } from '@angular/core/testing';

import { authInterceptorInterceptor } from '../interceptors/auth-interceptor.interceptor';

describe('AuthInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      authInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: authInterceptorInterceptor = TestBed.inject(authInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

