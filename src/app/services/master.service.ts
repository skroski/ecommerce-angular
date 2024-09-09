import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProduct, Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';
  private http = inject(HttpClient)

  getAllProducts(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + 'GetAllProducts');
  }
  getAllCategory(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + 'GetAllCategory');
  }
  getAllProductsByCategoryId(categoryId: number): Observable<Product> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`
    return this.http.get<Product>(url);
  }
}
