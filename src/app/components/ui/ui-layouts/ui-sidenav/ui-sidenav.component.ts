import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService, ToastrType } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-ui-sidenav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './ui-sidenav.component.html',
  styleUrls: ['./ui-sidenav.component.css']
})
export class UiSidenavComponent implements OnInit {

  categories:Category[]=[];
  currentCategory:Category;
  constructor(private categoryService:CategoryService,
    private _localStorage:LocalStorageService,
    private router:Router,
    private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories=response.data;
    })
  }

  setCurrentCategory(category:Category){
    this.currentCategory=category;
  }

  getCurrentCategoryClass(category:Category){
    if(category==this.currentCategory){
      return "list-group-item renk";
    }else{
      return "list-group-item"
    }
  }

  getAllCategoryClass(){
    if(!this.currentCategory){
      return "list-group-item renk";
    }else{
      return "list-group-item"
    }
  }
  clearCurrentCategory(){
    console.log("Kategori temizlenmeye çalışıldı.");
    console.log(this.currentCategory);
    
    this.currentCategory=new Category();
    console.log(this.currentCategory);
  }

  OturumuKapat(){
    this._localStorage.clear();
    this.toastr.toast(ToastrType.Warning,"Oturumunuz Sonlandırılıdı");
    this.router.navigate(["login"]);
  }

}
