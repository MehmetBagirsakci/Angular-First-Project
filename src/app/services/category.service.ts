import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient) { }

    getCategories():Observable<ListResponseModel<Category>>{
      let api = this.apiUrl + 'categories/getall';
      return this.httpClient.get<ListResponseModel<Category>>(api);
    }
}
