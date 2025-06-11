import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './category/categories.module';
import { DatabaseModule } from './database/database.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { BrandModule } from './brand/brand.module';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CategoriesModule,
    DatabaseModule,
    ProductVariantModule,
    ProductImagesModule,
    BrandModule,
    UsersModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
