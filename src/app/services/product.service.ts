import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient) { }

    getProducts(): Observable<ListResponseModel<Product>> {
      let api = this.apiUrl + 'products/getall';
      return this.httpClient.get<ListResponseModel<Product>>(api);
      // this._httpClient.get(this.apiUrl).subscribe((response:any)=>{
      //   console.log(response)
      // });
    }

    getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>>{
      let api=this.apiUrl+'products/getbycategory?categoryId='+categoryId;
      return this.httpClient.get<ListResponseModel<Product>>(api);
    }

    add(product:Product):Observable<ResponseModel>{
      let api=this.apiUrl+"products/add";
      return this.httpClient.post<ResponseModel>(api,product);
    }
}
