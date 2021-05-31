import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '@core/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
    
  }
  
  canActivate(): boolean {
     const loggedIn = this.authService.isLoggedIn();
     if(loggedIn) {
       return true;
     }
     this.router.navigate(['/auth/login'])
  }
}
