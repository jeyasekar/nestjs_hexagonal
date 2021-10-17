import {  Controller, Get, Inject, Post, UseFilters } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { defer } from "rxjs";
import FetchProductsAdapter from "src/application/products/adapters/fetch-products.adapter";
import { ProductsCommandPatterns } from "src/infrastructure/constants/products/products-command-pattern";
import { ExceptionFilter } from "src/infrastructure/Exception-filter/exception-filter";


@Controller()
export class ProductsController {
    constructor(
        private fetchProductsAdapter: FetchProductsAdapter,
    ) {
        console.log('products service controller created')
    }

    @UseFilters(new ExceptionFilter())
    @Get('/all')
    fetchMasterData() {
        console.log('Master service controller fetchMasterData method')
        throw new RpcException('tEST EXCEPTION FILTER fetchMasterData.');
        return this.fetchProductsAdapter.handle()

    }
    @MessagePattern({ cmd: ProductsCommandPatterns.FETCH_PRODUCTS })
    fetchProducts() {
        console.log('Master MQ service controller fetchProducts method')
        return defer(() => {
            return this.fetchProductsAdapter.handle()
        })
    }

}