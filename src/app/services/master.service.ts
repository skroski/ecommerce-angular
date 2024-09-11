import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, ApiModel } from '../models/ApiModel';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';
  private http = inject(HttpClient)

  getAllProducts(): Observable<ApiModel> {
    return this.http.get<ApiModel>(this.apiUrl + 'GetAllProducts');
  }
  getAllCategory(): Observable<ApiModel> {
    return this.http.get<ApiModel>(this.apiUrl + 'GetAllCategory');
  }
  getAllProductsByCategoryId(categoryId: number): Observable<ApiModel> {
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`
    return this.http.get<ApiModel>(url);
  }
  registerNewCustomer(obj: Customer): Observable<ApiModel> {
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<ApiModel>(url, obj);
  }
}
