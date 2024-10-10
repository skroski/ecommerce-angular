import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ApiModel, CartData, OrderModel } from '../../models/ApiModel';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss'
})

export class CreateOrderComponent implements OnInit {
  private masterService = inject(MasterService);
  cartData: CartData[] = [];
  totalAmount: number = 0;
  orderObj: OrderModel = new OrderModel();
  private formBuilderDelivery = inject(FormBuilder);

  deliveryFormGroup: FormGroup = this.formBuilderDelivery.group({
    DeliveryCity: new FormControl(''),
    DeliveryPinCode: new FormControl(''),
    DeliveryAddress1: new FormControl(''),
    DeliveryAddress2: new FormControl(''),
    DeliveryLandMark: new FormControl(''),
  });

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.masterService.getCartProductsByCustomerId(this.masterService.loggedUserData.custId)
      .subscribe((response: ApiModel) => {
        this.cartData = response.data;
        this.cartData.forEach(element => {
          this.totalAmount = this.totalAmount + element.productPrice;
        })
        console.log('Log Console', response.data, this.masterService.loggedUserData.custId);

      })
  }
  placeOrder() {
    debugger;
    this.orderObj.CustId = this.masterService.loggedUserData.custId;
    this.orderObj.TotalInvoiceAmount = this.totalAmount;

    this.masterService.onPlaceOrder(this.orderObj).subscribe((response: ApiModel) => {
      if (response.result) {
        alert('Order placed successfully');
        this.getCartItems();
        this.orderObj = new OrderModel();
      } else {
        alert(response.message);

      }
    })
  }
}
