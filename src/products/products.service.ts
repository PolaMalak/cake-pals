import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';
import { LocationDto } from './dtos/location.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { BakersService } from 'src/bakers/bakers.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private bakerService: BakersService,
  ) {}

  async addProduct(productDto: CreateProductDto, userId: string) {
    const product = this.productRepo.create({ ...productDto });
    const baker = await this.bakerService.findOneById(userId);
    product.baker = baker;
    return await this.productRepo.save(product);
  }

  async removeProduct(userId: string, productId: string) {
    const product = await this.findOneById(productId, ['baker']);
    if (product.baker.id !== userId)
      throw new UnauthorizedException(
        'you have no permission to remove this product',
      );
    await this.productRepo.remove(product);
  }

  async updateProduct(
    productDto: CreateProductDto,
    productId: string,
    userId: string,
  ) {
    const product = await this.findOneById(productId, ['baker']);
    if (product.baker.id !== userId)
      throw new UnauthorizedException(
        'you have no permission to edit this product',
      );
    product.bakingTime = productDto.bakingTime;
    product.type = productDto.type;
    return await this.productRepo.update(product.id, {
      bakingTime: productDto?.bakingTime || product.bakingTime,
      type: productDto?.type || product.type,
    });
  }

  async findOneById(productId: string, relations: string[]) {
    return await this.productRepo.findOne({
      where: { id: productId },
      relations: relations,
    });
  }

  async findAllProducts(location?: any, radius?: number, type?: string) {
    console.log(location);
    const productQuery = this.productRepo
      .createQueryBuilder('product')
      .select(['product.id', 'product.type', 'product.bakingTime'])
      .leftJoin('product.baker', 'baker');
    if (type) {
      productQuery.andWhere('LOWER(product.type) LIKE :type', { type });
    }
    if (location && radius) {
      productQuery.andWhere(
        `ST_Distance_Sphere(point(${location.longitude}, ${location.latitude}), point(baker.longitude, baker.latitude)) <= :radius`,
        { radius },
      );
    }
    productQuery
      .addSelect([
        `ST_Distance_Sphere(point(${location.longitude}, ${location.latitude}), point(baker.longitude, baker.latitude)) AS distance`,
        'baker.name',
        'baker.rating',
      ])
      .orderBy('distance');

    return await productQuery.getMany();
  }
}
