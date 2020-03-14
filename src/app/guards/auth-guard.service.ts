import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthenticationService} from './../user-authentication.service'
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _authService: UserAuthenticationService,
     private _router: Router,
     private toastr : ToastrService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (this._authService.isAuthenticated()) {
        return true;
    }
        this.toastr.error('User unauthorized');
        this._router.navigate(['/login']);
        return false;
}
}