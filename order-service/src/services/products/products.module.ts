import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductAdapter } from 'src/application/products/adapters/create-product.adapter';
import FetchProductsAdapter from 'src/application/products/adapters/fetch-products.adapter';
import { Product } from 'src/core-domain/adapters/products/entities/product.entity';
import { OrderRepository } from 'src/core-domain/adapters/products/repositories/order.repository';
import { ProductsSettingConstants } from 'src/infrastructure/constants/products/products-settings';
import { OrderDatabaseModule } from 'src/infrastructure/database/products/products-database.module';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'REDIS_SERVICE',
            transport: Transport.REDIS,
            options: {
                url: '//redis-17939.c1.asia-northeast1-1.gce.cloud.redislabs.com:17939',
                password:'iY78kOVxQbAFTHYnBxEYNzIDmc9SUfIj'
            },
          },]),
        OrderDatabaseModule,
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductsController],
    providers: [
        CreateProductAdapter,
        FetchProductsAdapter,
        {
            provide: ProductsSettingConstants.PRODUCTS_SERVICE,
            useClass: OrderRepository
        }
    ],
})
export class ProductsModule {
    constructor() {
        console.log('ProductsModule created')
    }
};