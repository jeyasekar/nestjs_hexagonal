import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductAdapter } from 'src/application/products/adapters/create-product.adapter';
import FetchProductsAdapter from 'src/application/products/adapters/fetch-products.adapter';
import { xxxx } from 'src/core-domain/adapters/products/entities/xxxx.entity';
import { OrderRepository } from 'src/core-domain/adapters/products/repositories/order.repository';
import { ProductsSettingConstants } from 'src/infrastructure/constants/products/products-settings';
import { OrderDatabaseModule } from 'src/infrastructure/database/products/products-database.module';
import { OrderExtInvokerService } from './order-ext-invoker.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'REDIS_SERVICE',
            transport: Transport.REDIS,
            options: {
                url: '//redis-17939.c1.asia-northeast1-1.gce.cloud.redislabs.com:17939',
                password: 'iY78kOVxQbAFTHYnBxEYNzIDmc9SUfIj'
            },
        },

        {
            name: ProductsSettingConstants.MASTER_MQ_CLIENT_PROXY,
            transport: Transport.RMQ,
            options: {
                urls: ['amqps://mgctrdee:bGBkCrxIP4MZbUQuC5-SAACtjLt0WqvM@mustang.rmq.cloudamqp.com/mgctrdee'],
                queue: 'products_service_queue',
                queueOptions: {
                    durable: false
                }
            }
        },

        ]),
        OrderDatabaseModule,
        TypeOrmModule.forFeature([xxxx])
    ],


    controllers: [ProductsController],
    providers: [
        CreateProductAdapter,
        FetchProductsAdapter,
        OrderExtInvokerService,
        {
            provide: ProductsSettingConstants.PRODUCTS_SERVICE,
            useClass: OrderRepository
        }
    ],
})
export class OrderModule {
    constructor() {
        console.log('ProductsModule created')
    }
};