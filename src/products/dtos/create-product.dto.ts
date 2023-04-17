import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, MaxLength, Validate } from 'class-validator';
import { IsTimeConstraint } from 'src/validators/is-time.validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(50)
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  @Validate(IsTimeConstraint)
  bakingTime: string;
}
