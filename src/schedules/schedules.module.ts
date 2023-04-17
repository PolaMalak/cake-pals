import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/models/schedule.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { BakersModule } from 'src/bakers/bakers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    UsersModule,
    ProductsModule,
    BakersModule,
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
