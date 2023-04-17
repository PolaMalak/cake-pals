import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BakersModule } from 'src/bakers/bakers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), BakersModule],
})
export class ProductsModule {}
