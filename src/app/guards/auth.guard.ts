import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.isLoggedIn() || this.authService.isExpired()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
