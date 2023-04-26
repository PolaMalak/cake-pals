import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtBakerAuthGuard } from 'src/auth/bakers/baker.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtBakerAuthGuard)
  @ApiBearerAuth()
  @Post('/add')
  async addProduct(@Body() productDto: CreateProductDto, @Request() req) {
    return await this.productsService.addProduct(productDto, req.user.id);
  }

  @UseGuards(JwtBakerAuthGuard)
  @ApiBearerAuth()
  @Delete('/remove/:productId')
  async removeProduct(@Param('productId') productId: string, @Request() req) {
    return await this.productsService.removeProduct(productId, req.user.id);
  }

  @UseGuards(JwtBakerAuthGuard)
  @ApiBearerAuth()
  @Put('/update/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() productDto: CreateProductDto,
    @Request() req,
  ) {
    return await this.productsService.updateProduct(
      productDto,
      productId,
      req.user.id,
    );
  }

  @Get('/all/:longitude/:latitude/:radius/:type')
  async findAllProducts(
    @Param('longitude') longitude: number,
    @Param('latitude') latitude: number,
    @Param('radius') radius: number,
    @Param('type') type: string,
  ) {
    return await this.productsService.findAllProducts(
      { longitude, latitude },
      radius,
      type,
    );
  }
}
