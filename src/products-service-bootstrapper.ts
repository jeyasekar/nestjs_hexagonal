import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from './infrastructure/configuration/config.service';
import { ProductsModule } from './services/products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule)
  await app.listen(ConfigService.create().getPort())
 
}
bootstrap();
