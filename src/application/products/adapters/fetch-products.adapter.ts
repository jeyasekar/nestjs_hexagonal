import { Inject, Injectable } from "@nestjs/common";
import { ProductModel } from "src/domian/products/models/product.model";
import { IProductsService } from "src/domian/products/ports/products.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { ProductsSettingConstants } from "src/infrastructure/constants/products/products-settings";


@Injectable()
export default class FetchProductsAdapter implements IBaseAdapter<number, ProductModel> {
    constructor(@Inject(ProductsSettingConstants.PRODUCTS_SERVICE) private productsService: IProductsService) {
        console.log('FetchProductsAdapter created')
    }
    handle(): Promise<ProductModel[]> {
        return this.productsService.fetchProducts()
    }
}