import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductModel } from "src/domian/products/models/product.model";
import { IProductsService } from "src/domian/products/ports/products.service";
import { ProductMapper } from "src/infrastructure/mapper/products/product.mapper";
import { Repository } from "typeorm";
import { Optional } from "typescript-optional";
import { xxxx } from "../entities/xxxx.entity";

@Injectable()
export class OrderRepository implements IProductsService {
    constructor(@InjectRepository(xxxx) private productsRepository: Repository<xxxx>) {
        console.log('ProductsRepository created')
    }
    async fetchProducts(): Promise<ProductModel[]> {
        const allProducts = await this.productsRepository.find()
        return ProductMapper.toDomains(allProducts)
    }
    async addProduct(product: ProductModel): Promise<ProductModel> {
        const added = await this.productsRepository.save({
            price: product.price,
            description: product.description,
            productName: product.productName,
            imageUrl: product.imageUrl,
            releaseDate: product.releaseDate
        })
        return ProductMapper.toDomain(added).get()
    }
   
}