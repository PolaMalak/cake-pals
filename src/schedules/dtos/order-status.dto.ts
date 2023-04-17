import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from 'src/enums/order-status.enum';

export class OrderStatusDto {
  @ApiProperty({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.ACCEPTED,
  })
  @IsEnum(OrderStatusEnum)
  @IsNotEmpty()
  orderStatus: OrderStatusEnum;
}
