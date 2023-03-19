import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { concatWith, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user: User;

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let api = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      api,
      loginModel
    );
  }

  isAuthenticated() {
    if (this.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }

  loggedIn(){
    //Doğru çalışmıyor
    if(this.localStorage.getItem("token")){
      let token=this.localStorage.getItem("token");
      
      return this.jwtHelper.isTokenExpired(token);
    }else{
      return false;
    }
  }

  getUser(): User {
    let decodedToken = this.decodedToken(this.localStorage.getItem('token'));

    if (decodedToken) {
      let tokenInfoName = Object.keys(decodedToken).filter((u) =>
        u.endsWith('/name')
      )[0];
      let userName = String(decodedToken[tokenInfoName]);

      let tokenInfoId = Object.keys(decodedToken).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      let userId = Number(decodedToken[tokenInfoId]);

      let claimInfo = Object.keys(decodedToken).filter((x) =>
        x.endsWith('/role')
      )[0];
      let roles = decodedToken[claimInfo];

      let emailInfo = decodedToken.email;
      this.user = {
        userId: userId,
        userName: userName,
        email: emailInfo,
        roles: roles,
      };
    }
    return this.user;
  }

  isAdmin() {
    let isAdmin = false;
    if (this.isAuthenticated()) {
      this.user.roles
        ?.toString()
        .split(',')
        .map((role) => {
          if (role.toLocaleLowerCase().indexOf('admin') !== -1) {
            isAdmin = true;
          }
        });
    }
    return isAdmin;
  }


  roleCheck(roleName: string) {
    if (this.user.roles != null) {
      console.log(this.user.roles);
      
      for (let i = 0; i < this.user.roles.length; i++) {
        if(this.user.roles[i]==roleName){
          return true;
        }
      }
      return false;
    }else{
      return false;
    }
    
  }

  // logout(){
  //   this.localStorage.clear();
  //   this.onRefresh()
  // }
}
