import { Optional } from "typescript-optional";
import { ProductModel } from "../models/product.model";

export interface IProductsService {
    fetchProducts(): Promise<ProductModel[]>;

    addProduct(product: ProductModel): Promise<ProductModel>;

}