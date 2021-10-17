import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import FetchProductsAdapter from 'src/application/products/adapters/fetch-products.adapter';
import { Product } from 'src/core-domain/adapters/products/entities/product.entity';
import { OrderRepository } from 'src/core-domain/adapters/products/repositories/order.repository';
import { ProductsSettingConstants } from 'src/infrastructure/constants/products/products-settings';
import { OrderDatabaseModule } from 'src/infrastructure/database/products/products-database.module';
import { ExceptionFilter } from 'src/infrastructure/Exception-filter/exception-filter';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        // ClientsModule.register([
        //     {
        //         name: ProductsSettingConstants.MASTER_MQ_CLIENT_PROXY,
        //         transport: Transport.RMQ,
        //         options: {
        //             urls: ['amqps://mgctrdee:bGBkCrxIP4MZbUQuC5-SAACtjLt0WqvM@mustang.rmq.cloudamqp.com/mgctrdee'],
        //             queue: 'products_service_queue',
        //             queueOptions: {
        //                 durable: false
        //             }
        //         }
        //     },
        // ]),
        OrderDatabaseModule,
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductsController],
    providers: [
        FetchProductsAdapter,
        ExceptionFilter,
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