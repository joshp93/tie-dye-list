import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import * as moment from 'moment';
import { HeaderOptions } from '../interfaces/header-options';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static GRANT_TYPE_PASSWORD = "password";
  private static GRANT_TYPE_REFRESH = "refresh_token";
  private authEndpoint = "/auth/realms/" + environment.realm + "/protocol/openid-connect/token";

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      } as HeaderOptions;
      let body = new URLSearchParams();
      body.set('client_id', environment.clientId);
      body.set('grant_type', AuthService.GRANT_TYPE_PASSWORD);
      body.set('username', username);
      body.set('password', password);

      this.http.post<AuthResponse>(environment.KeycloakAdminBaseUrl + this.authEndpoint, body.toString(), options).subscribe(
        response => {
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("refresh_token", response.refresh_token);
          sessionStorage.setItem("token_expiry", moment(new Date()).add(response.expires_in, 'm').toISOString());
          sessionStorage.setItem("refresh_token_expiry", moment(new Date()).add(response.refresh_expires_in, 'm').toISOString());
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
      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      } as HeaderOptions;
      let body = new URLSearchParams();
      body.set('client_id', environment.clientId);
      body.set('grant_type', AuthService.GRANT_TYPE_REFRESH);
      body.set('refresh_token', sessionStorage.getItem("refresh_token"));
  
      this.http.post<AuthResponse>(environment.KeycloakAdminBaseUrl + this.authEndpoint, body.toString(), options).subscribe(
        response => {
          sessionStorage.setItem("access_token", response.access_token);
          sessionStorage.setItem("refresh_token", response.refresh_token);
          sessionStorage.setItem("token_expiry", moment(new Date()).add(response.expires_in, 'm').toISOString());
          sessionStorage.setItem("refresh_token_expiry", moment(new Date()).add(response.refresh_expires_in, 'm').toISOString());
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
            alert("There was an error authenticating you 😢");
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
