import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard2 implements CanActivate {

  constructor(private authService: AuthService, 
              private router: Router
            ) {}

  canActivate() {
    if(this.authService.adminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}