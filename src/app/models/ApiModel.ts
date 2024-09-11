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

export interface Customer {
    CustId: number;
    Name: string;
    MobileNo: string;
    Password: string;
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