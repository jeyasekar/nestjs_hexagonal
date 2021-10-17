import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateProductAdapter } from "src/application/products/adapters/create-product.adapter";
import FetchProductsAdapter from "src/application/products/adapters/fetch-products.adapter";
import { CreateProductCommand } from "src/application/products/commnds/create-product.command";
import { ProductsExtInvokerService } from "./products-ext-invoker.service";


@Controller()
export class ProductsController {
    constructor(
        private createProductAdapter: CreateProductAdapter,
        private fetchProductsAdapter: FetchProductsAdapter,
        private exInvoker: ProductsExtInvokerService,
    ) {
        console.log('products service controller created')
    }

    @Post('/add')
    create(@Body() product: CreateProductCommand) {
        console.log('products service controller create method')
        console.log(product)
        return this.createProductAdapter.handle(product)
    }

    @Get('/all')
    fetchProducts() {
        console.log('products service controller fetchProducts method')

        return this.fetchProductsAdapter.handle()

    }

    @Get('/redis')
    fetchRedisData() {
        console.log('order service controller fetchProducts method')
        return this.exInvoker.fetchRedisData();
         
    }

    @Get('/masterq')
    fetchMQData() {
        console.log('order service controller masterq method')
        return this.exInvoker.fetchProducts();
    }
}