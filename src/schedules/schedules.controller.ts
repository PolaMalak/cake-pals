import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { JwtUserAuthGuard } from 'src/auth/users/user.guard';
import { JwtBakerAuthGuard } from 'src/auth/bakers/baker.guard';
import { OrderStatusDto } from './dtos/order-status.dto';
import { OrderRateDto } from './dtos/order-rate.dto';

@Controller('orders')
@ApiTags('orders')
export class SchedulesController {
  constructor(private scheduleService: SchedulesService) {}

  @UseGuards(JwtUserAuthGuard)
  @Post('/new')
  async addOrder(@Request() req: any, @Body() scheduleDto: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleDto, req.user.id);
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('/availableSlots/:productId')
  async availableSlots(
    @Request() req: any,
    @Param('productId') productId: string,
  ) {
    return this.scheduleService.checkAllAvailableSlots(productId, req.user.id);
  }

  @Delete('all')
  async deleteAllSchedules() {
    return await this.scheduleService.deleteAll();
  }

  @UseGuards(JwtBakerAuthGuard)
  @Post('/baker/manage/:orderId')
  async manageOrders(
    @Request() req,
    @Param('orderId') orderId: string,
    @Body() orderStatusDto: OrderStatusDto,
  ) {
    return await this.scheduleService.manageOrders(
      req.user.id,
      orderId,
      orderStatusDto,
    );
  }

  @UseGuards(JwtUserAuthGuard)
  @Post('/user/orders')
  async getUserOrders(@Request() req) {
    return await this.scheduleService.getUserFulfilledOrders(req.user.id);
  }
  @UseGuards(JwtUserAuthGuard)
  @Post('/user/orders/rate/:orderId')
  async rateOrder(
    @Request() req,
    @Param('orderId') orderId: string,
    @Body() orderRateDto: OrderRateDto,
  ) {
    return await this.scheduleService.rateOrder(
      req.user.id,
      orderId,
      orderRateDto,
    );
  }
}
