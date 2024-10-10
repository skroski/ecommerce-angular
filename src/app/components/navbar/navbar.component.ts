import { Component, inject, OnInit } from '@angular/core';
import { ApiModel, CartData, Customer } from '../../models/ApiModel';
import { MasterService } from '../../services/master.service';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  loggedUserData: Customer = new Customer();
  masterService = inject(MasterService);
  cartData: CartData[] = [];
  ngOnInit(): void {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
      this.getCartItems();
    }
    this.masterService.onCartAdded.subscribe((response: boolean) => {
      if (response) {
        this.getCartItems();
      }
    })

  }
  onRemoveProduct(cartId: number): void {

    this.masterService.deleteProductFromCartById(cartId).subscribe((response: ApiModel) => {
      if (response.result) {
        alert('Item excluído do carrinho com sucesso!');
        this.getCartItems();
      } else {
        alert('Falha ao excluir item do carrinho!');
      }
    });
  }
  getCartItems() {
    this.masterService.getCartProductsByCustomerId(this.loggedUserData.custId).subscribe((response: ApiModel) => {
      if (!response.result) {
        alert('Falha ao carregar itens do carrinho!');
        return;
      } else {
        console.log(response.data);
        this.cartData = response.data;
      }
    });
  }

}
