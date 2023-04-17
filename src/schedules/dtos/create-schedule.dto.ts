import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  collectingTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
}
