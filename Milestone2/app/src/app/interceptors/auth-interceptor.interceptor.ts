import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export class authInterceptorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
  
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}");

    if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: { 
              "x-access-token": `${currentUser.token}`
          }
      });
  }
    
    return next.handle(request);
  }
};