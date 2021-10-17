import { Inject, Injectable } from "@nestjs/common";
import { ProductModel } from "src/domian/products/models/product.model";
import { IProductsService } from "src/domian/products/ports/products.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { ProductsSettingConstants } from "src/infrastructure/constants/products/products-settings";
import { CreateProductCommand } from "../commnds/create-product.command";

@Injectable()
export class CreateProductAdapter implements IBaseAdapter<CreateProductCommand, ProductModel> {
    constructor(@Inject(ProductsSettingConstants.PRODUCTS_SERVICE) private productsService: IProductsService) {
        console.log('CreateProductAdapter created')
    }

    async handle(product?: CreateProductCommand): Promise<ProductModel> {
        return this.productsService.addProduct({ ...product })
    }
}