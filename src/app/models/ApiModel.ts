export interface ApiModel {
    message: string,
    result: boolean,
    data: any
}
export interface CategoryProduct {
    categoryId: number,
    categoryName: string,
    parentCategoryId: number,
    userId: number
}
export interface CartData {
    cartId: number
    custId: number
    productId: number
    quantity: number
    productShortName: string
    addedDate: string
    productName: string
    categoryName: string
    productImageUrl: string
    productPrice: number
}
export class Customer {
    custId: number;
    name: string;
    MobileNo: string;
    Password: string;
    constructor() {
        this.custId = 0;
        this.name = '';
        this.MobileNo = '';
        this.Password = '';
    }
}

export class CartModel {
    CartId: number;
    CustId: number;
    ProductId: number;
    Quantity: number;
    AddedDate: Date;

    constructor() {
        this.CartId = 0;
        this.CustId = 0;
        this.ProductId = 0;
        this.Quantity = 1;
        this.AddedDate = new Date();
    };

}
export class LoginModel {
    UserName: number;
    UserPassword: string;
    constructor() {
        this.UserName = 0;
        this.UserPassword = '';
    }
}
export interface ProductList {
    productId: number
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
    categoryName: string
}