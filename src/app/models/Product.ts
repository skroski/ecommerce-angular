export interface Product {
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