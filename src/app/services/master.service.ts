import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer, ApiModel, LoginModel, CartModel, OrderModel } from '../models/ApiModel';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';

  onCartAdded: Subject<boolean> = new Subject<boolean>();
  private http = inject(HttpClient)
  loggedUserData: Customer = new Customer();
  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }
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

  onLogin(obj: LoginModel): Observable<ApiModel> {
    const url = `${this.apiUrl}Login`;
    return this.http.post<ApiModel>(url, obj);
  }
  addToCart(obj: CartModel): Observable<ApiModel> {
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<ApiModel>(url, obj);
  }
  getCartProductsByCustomerId(loggedUserId: number): Observable<ApiModel> {
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserId}`
    return this.http.get<ApiModel>(url);
  }
  deleteProductFromCartById(cartId: number): Observable<ApiModel> {
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`
    return this.http.get<ApiModel>(url);
  }
  onPlaceOrder(object: OrderModel): Observable<ApiModel> {
    const url = `${this.apiUrl}PlaceOrder`;
    return this.http.post<ApiModel>(url, object);
  }
}
