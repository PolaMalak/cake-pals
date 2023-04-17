import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/models/schedule.entity';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { DateTime, Duration } from 'luxon';
import { Baker } from 'src/models/baker.entity';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { OrderStatusDto } from './dtos/order-status.dto';
import { OrderStatusEnum } from 'src/enums/order-status.enum';
import { OrderRateDto } from './dtos/order-rate.dto';
import { BakersService } from 'src/bakers/bakers.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
    private productsService: ProductsService,
    private usersService: UsersService,
    private bakerService: BakersService,
  ) {}

  async deleteAll() {
    return await this.scheduleRepo.delete({});
  }
  async checkAllAvailableSlots(productId: string, userId: string) {
    console.log(productId);
    const product = await this.productsService.findOneById(productId, [
      'baker',
    ]);
    const baker = product.baker;
    const schedules = await this.scheduleRepo
      .createQueryBuilder('schedules')
      .leftJoin('schedules.baker', 'baker')
      .where('baker.id = :id', { id: product.baker.id })
      .leftJoinAndSelect('schedules.product', 'product')
      .getMany();
    const duration = Duration.fromISOTime(product.bakingTime);
    const totalMinutes = duration.as('minutes');
    const reservedSlots = schedules.map((schedule) => {
      const newTaskStartDate = DateTime.fromMillis(
        schedule.collectingTime.getTime(),
        { zone: 'utc' },
      ).minus(Duration.fromISOTime(schedule.product.bakingTime));
      return {
        start: newTaskStartDate.toJSDate(),
        end: schedule.collectingTime,
      };
    });
    //console.log(totalMinutes);
    return this.findAvailableTime(
      baker.startAt,
      baker.endAt,
      totalMinutes,
      reservedSlots,
    );
  }
  async createSchedule(scheduleDto: CreateScheduleDto, userId: string) {
    const product = await this.productsService.findOneById(
      scheduleDto.productId,
      ['baker', 'baker.schedules'],
    );
    const baker = product.baker;
    const user = await this.usersService.findOneById(userId, []);
    const order = new Schedule();
    order.baker = baker;
    order.user = user;
    order.collectingTime = new Date(scheduleDto.collectingTime);
    order.product = product;
    try {
      this.addNewOrder(
        baker,
        {
          bakingTime: product.bakingTime,
          collectingTime: new Date(scheduleDto.collectingTime),
        },
        baker.schedules,
      );
      const newSchedule = new Schedule();
      newSchedule.baker = baker;
      newSchedule.user = user;
      console.log(scheduleDto.collectingTime);
      newSchedule.collectingTime = new Date(scheduleDto.collectingTime);
      newSchedule.product = product;
      return await this.scheduleRepo.save(newSchedule);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async manageOrders(
    bakerId: string,
    orderId: string,
    orderStatusDto: OrderStatusDto,
  ) {
    const order = await this.scheduleRepo
      .createQueryBuilder('order')
      .leftJoin('order.baker', 'baker')
      .where('order.id = :orderId', { orderId: orderId })
      .andWhere('baker.id = :bakerId', { bakerId: bakerId })
      .getOne();

    if (order)
      return await this.scheduleRepo.update(order.id, {
        status: orderStatusDto.orderStatus,
      });
  }

  async getUserFulfilledOrders(userId: string) {
    return await this.scheduleRepo
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .where('user.id = :userId', { userId: userId })
      .andWhere('order.status = :orderStatus', {
        orderStatus: OrderStatusEnum.FULFILLED,
      })
      .getMany();
  }

  async rateOrder(userId: string, orderId: string, orderRateDto: OrderRateDto) {
    const order = await this.scheduleRepo
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .leftJoin('order.baker', 'baker')
      .where('order.id = :orderId', { orderId: orderId })
      .andWhere('user.id = :userId', { userId: userId })
      .getOne();
    if (order)
      return this.bakerService.rateBaker(order.baker, orderRateDto.rate);
  }

  addNewOrder(baker: Baker, newOrder: Order, schedules: Schedule[]) {
    console.log(newOrder);
    const newTaskDueDate = DateTime.fromMillis(
      newOrder.collectingTime.getTime(),
      { zone: 'utc' },
    );
    const newTaskEndTime = newTaskDueDate;
    const newTaskStartDate = newTaskEndTime.minus({
      hours: parseInt(newOrder.bakingTime.substring(0, 2)),
      minutes: parseInt(newOrder.bakingTime.substring(3, 5)),
      seconds: parseInt(newOrder.bakingTime.substring(6, 8)),
    });
    const newTaskStartTime = newTaskStartDate;
    if (
      newTaskStartDate.toMillis() < DateTime.now().setZone('utc').toMillis()
    ) {
      throw new BadRequestException('this collecting time is not valid');
    }
    if (
      newTaskStartTime.toFormat('HH:mm:ss') < baker.startAt ||
      newTaskEndTime.toFormat('HH:mm:ss') > baker.endAt
    ) {
      throw new Error('Task cannot be scheduled outside working hours');
    }

    for (const order of schedules) {
      const taskDueTime = DateTime.fromMillis(order.collectingTime.getTime(), {
        zone: 'utc',
      });
      const taskEndTime = taskDueTime;
      const taskStartTime = taskDueTime.minus({
        hours: parseInt(order.product.bakingTime.substring(0, 2)),
        minutes: parseInt(order.product.bakingTime.substring(3, 5)),
        seconds: parseInt(order.product.bakingTime.substring(6, 8)),
      });
      if (
        (newTaskStartDate > taskStartTime && newTaskStartDate < taskEndTime) ||
        (newTaskDueDate > taskStartTime && newTaskDueDate <= taskEndTime) ||
        (newTaskStartDate <= taskStartTime && newTaskDueDate >= taskEndTime)
      ) {
        throw new Error(`order overlaps with another order.`);
      }
    }

    return true;
  }

  findAvailableTime(
    startTime: string,
    endTime: string,
    orderDuration: number,
    reservedSlots: Slot[],
  ): SlotDateTime[] {
    // Convert startTime and endTime to DateTime objects in UTC
    const startDateTime = DateTime.fromFormat(startTime, 'HH:mm:ss', {
      zone: 'utc',
    });
    const endDateTime = DateTime.fromFormat(endTime, 'HH:mm:ss', {
      zone: 'utc',
    });

    // Convert reserved slot start and end times to DateTime objects in UTC
    const reservedSlotsUTC = reservedSlots.map((slot) => ({
      start: DateTime.fromJSDate(slot.start).setZone('utc'),
      end: DateTime.fromJSDate(slot.end).setZone('utc'),
    }));

    const sortedReservedSlots = reservedSlotsUTC.sort(
      (a, b) => a.start.toMillis() - b.start.toMillis(),
    );

    // Generate all slots between start and end times
    const allSlots: SlotDateTime[] = [];
    let slotStart = startDateTime;
    while (slotStart < endDateTime) {
      const slotEnd = slotStart.plus({ minutes: orderDuration });
      if (slotEnd < endDateTime) {
        allSlots.push({
          start: slotStart,
          end: slotEnd,
        });
      }
      slotStart = slotEnd;
    }
    const availableSlots: SlotDateTime[] = [];

    // if (
    //   sortedReservedSlots.length === 0 ||
    //   allSlots[0].end <= sortedReservedSlots[0].start
    // ) {
    //   // If there are no reserved slots or the first slot is available, add it to the available slots array
    //   if()
    //   availableSlots.push(allSlots[0]);
    // }

    // Loop through all remaining slots
    for (let i = 0; i < allSlots.length; i++) {
      //console.log(allSlots[i]);
      const currentSlot = allSlots[i];
      if (
        currentSlot.start.toMillis() <= DateTime.now().setZone('utc').toMillis()
      ) {
        console.log(currentSlot.start.toMillis());
        console.log(DateTime.now().setZone('utc').toMillis());
      }
      //const lastAvailableSlot = availableSlots[availableSlots.length - 1];

      // Check if the current slot overlaps with any reserved slot
      const isOverlap = sortedReservedSlots.some(
        (sortedReservedSlot) =>
          currentSlot.start < sortedReservedSlot.end &&
          currentSlot.end > sortedReservedSlot.start,
      );

      if (!isOverlap) {
        if (
          currentSlot.start.toMillis() >=
          DateTime.now().setZone('utc').toMillis()
        )
          availableSlots.push(currentSlot);
      }
    }

    return availableSlots;
  }
}

interface Order {
  bakingTime: string;
  collectingTime: Date;
}

interface Slot {
  start: Date;
  end: Date;
}

export interface SlotDateTime {
  start: DateTime;
  end: DateTime;
}

export interface AvailableSlot {
  start: string;
  end: string;
}
