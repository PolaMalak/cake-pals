import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBakerDto } from './dtos/add-baker.dto';
import { BakerResource } from './resources/baker.resource';
import { BakersService } from './bakers.service';

@Controller('bakers')
@ApiTags('bakers')
export class BakersController {
  constructor(private bakersService: BakersService) {}

  @Post('/register')
  async registerBaker(@Body() bakerDto: CreateBakerDto) {
    return await this.bakersService.createBaker(bakerDto);
  }

  @Get('/all')
  async getAllBakers() {
    return await this.bakersService.findAllBakers();
  }

  @Delete('/all')
  async deleteAllBakers() {
    return await this.bakersService.deleteAll();
  }
}
