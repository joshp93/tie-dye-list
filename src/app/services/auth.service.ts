import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/auth-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static GRANT_TYPE_PASSWORD = "password";
  private static GRANT_TYPE_REFRESH = "refresh_token";

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const authRequest = new AuthRequest(username, password);

      this.http.post<AuthResponse>(`${environment.authBaseUrl}/login`, authRequest).subscribe(
        response => {
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("refresh_token", response.refresh_token);
          sessionStorage.setItem("token_expiry", moment(new Date()).add(response.expires_in, 's').toISOString());
          sessionStorage.setItem("refresh_token_expiry", moment(new Date()).add(response.refresh_expires_in, 's').toISOString());
          resolve(true);
        },
        error => {
          console.error(error);
          reject(false);
        }
      );
    });
  }

  getRefreshToken(): Promise<void> {
    
    return new Promise<void>((resolve, reject) => {
      let body = new URLSearchParams();
      body.set('refresh_token', sessionStorage.getItem("refresh_token"));
  
      this.http.post<AuthResponse>(`${environment.authBaseUrl}/refreshToken`, body.toString()).subscribe(
        response => {
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("refresh_token", response.refresh_token);
          sessionStorage.setItem("token_expiry", moment(new Date()).add(response.expires_in, 's').toISOString());
          sessionStorage.setItem("refresh_token_expiry", moment(new Date()).add(response.refresh_expires_in, 's').toISOString());
          resolve();
        },
        error => {
          console.error(error);
          reject();
        }
      );
    });
  }

  isAuthorized(): boolean {
    return sessionStorage.getItem("access_token") ? true : false;
  }

  reviewAuthentication(): Observable<void> {
    return new Observable<void>((result) => {
      const tokenExpiryDate = new Date(sessionStorage.getItem("token_expiry"));
      const refreshTokenExpiryDate = new Date(sessionStorage.getItem("refresh_token_expiry"));
      if (tokenExpiryDate <= new Date() && refreshTokenExpiryDate <= new Date()) {
        this.logout();
        result.error();
      } else if (tokenExpiryDate <= new Date()) {
        this.getRefreshToken()
          .then(() => result.next())
          .catch(() => {
            this.logout();
            result.error();
          })
      } else {
        result.next();
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
