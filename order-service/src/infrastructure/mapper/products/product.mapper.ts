import { xxxx } from "src/core-domain/adapters/products/entities/xxxx.entity"
import { ProductModel } from "src/domian/products/models/product.model"
import { Optional } from "typescript-optional"

export class ProductMapper {
    static toDomain(repoEntity: xxxx): Optional<ProductModel> {
        if (!repoEntity) {
            return Optional.empty<ProductModel>()
        }

        const productModel: ProductModel = new ProductModel(
            repoEntity.productName,
            repoEntity.description,
            repoEntity.releaseDate,
            repoEntity.price,
            repoEntity.imageUrl,
            repoEntity.likes,
            repoEntity.productId
        )

        return Optional.of(productModel)
    }
    static toDomains(repoEntities: xxxx[]): ProductModel[] {
        const productModels = new Array<ProductModel>()
        repoEntities.forEach(
            re => {
                const productModel = this.toDomain(re)
                productModels.push(productModel.get())
            }
        )
        return productModels
    }
}