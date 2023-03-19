import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from 'src/app/pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from 'src/app/pipes/product-filter.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService,ToastrType } from 'src/app/services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    VatAddedPipe,
    FormsModule,
    ProductFilterPipe
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  pageName: string = 'Ürünler Sayfası';
  dataLoaded: boolean = false;
  products: Product[] = [];
  filterText: string = "";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService:CartService,
    private toastr:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts();
      }
    })
    //this.getProducts();
  }
  
  getProductsESKI() {
    this.productService.getProducts().subscribe(response => {
      this.dataLoaded = true;
      this.products = response.data
    },responseError=>{      
      this.toastr.toast(ToastrType.Error,"SERVİS HATASI",responseError.error.message);
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next:(response)=>{
        this.products=response.data;
      },
      error:(responseError)=>{
        this.toastr.toast(ToastrType.Error,"SERVİS HATASI",responseError.error.message);
      },
      complete:()=>{this.dataLoaded=true;}
    })
  }

  getProductsByCategoryESKI(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe((response) => {
      this.dataLoaded = true;
      this.products = response.data;
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next:(response)=>{
        this.products=response.data
      },
      error:(responseError)=>{
        this.toastr.toast(ToastrType.Error,"SERVİS HATASI","Kategorideki ürün getirilemiyor",)
      },
      complete:()=>{ this.dataLoaded=true;}
    })
    }
  

  addToCart(product: Product) {
    //alert("Sepete Eklendi" + product.productName)
    this.toastr.toast(ToastrType.Success,"Ürün sepete eklendi","");
    this.cartService.addToCart(product);
  }

  tokenControl(){
    return this.authService.loggedIn();
  }
}
