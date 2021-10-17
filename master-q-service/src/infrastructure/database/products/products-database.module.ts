import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { ProductsSettingConstants } from 'src/infrastructure/constants/products/products-settings';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            ConfigService
                .create()
                .ensureValues(
                    [
                        ProductsSettingConstants.PRODUCTS_POSTGRES_HOST,
                        ProductsSettingConstants.PRODUCTS_POSTGRES_PORT,
                        ProductsSettingConstants.PRODUCTS_POSTGRES_USERNAME,
                        ProductsSettingConstants.PRODUCTS_POSTGRES_PASSWORD,
                        ProductsSettingConstants.PRODUCTS_POSTGRES_DATABASE,
                        ProductsSettingConstants.PRODUCTS_ENTITIES_PATH,
                        ProductsSettingConstants.PRODUCTS_MIGRATION_TABLE_NAME,
                        ProductsSettingConstants.PRODUCTS_MIGRATIONS_FILE_PATH,
                        ProductsSettingConstants.PRODUCTS_MIGRATIONS_DIRECTORY
                    ]
                )
                .getTypeOrmConfig()
        )]
})
export class OrderDatabaseModule { };