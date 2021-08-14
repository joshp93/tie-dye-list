import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private grantTypePassword = "password";
  private grantTypeRefresh = "refresh_token";
  private authEndpoint = "/auth/realms/" + environment.realm + "/protocol/openid-connect/token";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
      const body = {
        client_id: environment.clientId,
        grant_type: this.grantTypePassword,
        username: username,
        password: password
      } as AuthRequest;

      this.http.post<AuthResponse>(environment.KeycloakAdminBaseUrl + this.authEndpoint, body, { headers: headers }).subscribe(
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

  getRefreshToken() {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      client_id: environment.clientId,
      grant_type: this.grantTypeRefresh,
      refresh_token: localStorage.getItem("refresh_token")
    } as AuthRequest;

    this.http.post<AuthResponse>(environment.KeycloakAdminBaseUrl + this.authEndpoint, body, { headers: headers }).subscribe(
      response => {
        sessionStorage.setItem("access_token", response.access_token);
        sessionStorage.setItem("refresh_token", response.refresh_token);
        sessionStorage.setItem("token_expiry", moment(new Date()).add(response.expires_in, 'm').toISOString());
        sessionStorage.setItem("refresh_token_expiry", moment(new Date()).add(response.refresh_expires_in, 'm').toISOString());
      },
      error => console.error(error)
    );
  }

  isAuthorized(): boolean {
    return localStorage.getItem("access_token") ? true : false;
  }
}
