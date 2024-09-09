
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Product, ProductList, CategoryProduct } from './../../models/Product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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

  masterService = inject(MasterService);
  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    )
  }

  loadAllProducts(): void {
    this.subscriptionList.push(
      this.masterService.getAllProducts().subscribe((response: Product) => {
        //this.productList = response.data;
        this.productList.set(response.data);
      }));
  }
  getProductByCategory(id: number) {
    console.log(id);

    this.masterService.getAllProductsByCategoryId(id).subscribe((response: Product) => {
      this.productList.set(response.data);
    })
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
