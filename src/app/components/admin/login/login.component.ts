import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {   FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ToastrService, ToastrType } from 'src/app/services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toast:ToastrService,
    private authService:AuthService,
    private _localStorage:LocalStorageService,
    private router:Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["engin@engin.com",Validators.required],
      password:["12345",Validators.required]
    })
  }

  login(){  
    if(this.loginForm.valid){
      //Gelen formu boş bir obje oluşturup içine koyup post ediyoruzm.
      let loginModel=Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe((response)=>{
          this.toast.toast(ToastrType.Success,response.message);
          this._localStorage.setItem("token",response.data.token);
          this.router.navigate(["/"]);
          this.cagir();
      },responseError=>{
        this.toast.toast(ToastrType.Error,responseError.error)
      })
    }else{
      //Form valid değilse post etme
      this.toast.toast(ToastrType.Error,"Lütfen Tüm Alanları Doldurun","Hata")
    }
  }

  cagir(){
    console.log("Ben login component içindeyim.")
    console.log(this.authService.getUser());
  }

  isAdmin(){
    console.log("Ben login component içindeyim.")
    return this.authService.isAdmin();
  }
  roleCheck(roleName:string){
    console.log("Ben login component içindeyim.")
    return this.authService.roleCheck(roleName);
  }
}
