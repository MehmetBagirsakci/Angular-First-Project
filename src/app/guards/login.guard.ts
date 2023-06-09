import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService, ToastrType } from '../services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated()){
        return true;
      }else{
        this.router.navigate(["login"])
        this.toastrService.toast(ToastrType.Error,"Hata","Sisteme giriş yapmalısınız.")
        return false;
      }
  }
  
}
