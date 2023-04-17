import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class OrderRateDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;
}
