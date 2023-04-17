import { Module } from '@nestjs/common';
import { BakersService } from './bakers.service';
import { BakersController } from './bakers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BakersRepository } from './bakers.repository';
import { Baker } from 'src/models/baker.entity';

@Module({
  providers: [BakersService, BakersRepository],
  imports: [TypeOrmModule.forFeature([Baker])],
  exports: [BakersService],
  controllers: [BakersController],
})
export class BakersModule {}
