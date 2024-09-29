
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ApiModel, ProductList, CategoryProduct, CartModel, Customer } from '../../models/ApiModel';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  //productList: ProductList[] = [];
  productList = signal<ProductList[]>([]);

  categoryList$: Observable<CategoryProduct[]> = new Observable<CategoryProduct[]>();
  subscriptionList: Subscription[] = [];
  loggedUserData: Customer = new Customer();

  masterService = inject(MasterService);
  constructor() {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY)
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }
  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    )
  }

  loadAllProducts(): void {
    this.subscriptionList.push(
      this.masterService.getAllProducts().subscribe((response: ApiModel) => {
        //this.productList = response.data;
        this.productList.set(response.data);
      }));
  }
  getProductByCategory(id: number) {
    console.log(id);

    this.masterService.getAllProductsByCategoryId(id).subscribe((response: ApiModel) => {
      this.productList.set(response.data);
    })
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
  onAddToCart(id: number) {
    const newCartObj: CartModel = new CartModel();
    newCartObj.ProductId = id;
    newCartObj.CustId = this.loggedUserData.custId;
    this.masterService.addToCart(newCartObj).subscribe((response: ApiModel) => {
      if (response.result) {
        alert('Item adicionado ao carrinho!');
        this.masterService.onCartAdded.next(true);
      } else {
        alert('Falha ao adicionar ao carrinho!');
      }
    });
  }
}
