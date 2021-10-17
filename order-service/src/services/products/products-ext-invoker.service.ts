import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateProductCommand } from "src/application/products/commnds/create-product.command";
import { UpdateProductCommand } from "src/application/products/commnds/upadate-product.command";
import { ProductModel } from "src/domian/products/models/product.model";
import { ProductsCommandPatterns } from "src/infrastructure/constants/products/products-command-pattern";
import { ProductsSettingConstants } from "src/infrastructure/constants/products/products-settings";

@Injectable()
export class ProductsExtInvokerService {
    constructor(
        @Inject(ProductsSettingConstants.MASTER_MQ_CLIENT_PROXY) private productsClient: ClientProxy,
        
        @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,) {
        console.log('ProductsExtInvokerService created')
    }
    fetchProducts() {
        console.log('inside service')
        return this.productsClient.send<ProductModel[]>(
            { cmd: ProductsCommandPatterns.FETCH_PRODUCTS }, {})
    }

    fetchRedisData() {
        console.log('service controller fetchProducts method')

        return this.redisClient.send<string>(
            { cmd: 'first_service' },
            'Message from',
          );

    }
}