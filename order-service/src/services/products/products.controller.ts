import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateProductAdapter } from "src/application/products/adapters/create-product.adapter";
import FetchProductsAdapter from "src/application/products/adapters/fetch-products.adapter";
import { CreateProductCommand } from "src/application/products/commnds/create-product.command";


@Controller()
export class ProductsController {
    constructor(
        private createProductAdapter: CreateProductAdapter,
        private fetchProductsAdapter: FetchProductsAdapter,
        @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,
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
        console.log('service controller fetchProducts method')

        return this.redisClient.send<string>(
            { cmd: 'first_service' },
            'Message from',
          );

    }
}