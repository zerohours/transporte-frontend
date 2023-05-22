import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected basePath: string = 'http://localhost:8080';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.basePath}/login`, usuario)
      .pipe(
        retry(0)
      )
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token');
  }

  // Check if token has expired
  isExpired(): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.isLoggedIn());
  }

  setLoginUser(response: any) {
    localStorage.setItem('username', response.name);
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('authorities', response.authorities);

    this.router.navigate(['/home']).then();
  }
}
