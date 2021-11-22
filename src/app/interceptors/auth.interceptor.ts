import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.authBaseUrl)) {
      return next.handle(request);
    }
    
    const authReq = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${sessionStorage.getItem("access_token")}`)
    });

    return next.handle(authReq);
  }
}
