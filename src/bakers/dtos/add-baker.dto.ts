import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { CreateUserDto } from 'src/users/dtos/cerate-user.dto';
import { IsTimeConstraint } from 'src/validators/is-time.validator';

export class CreateBakerDto extends CreateUserDto {
  @IsNotEmpty()
  @Validate(IsTimeConstraint)
  @ApiProperty({
    nullable: false,
    description:
      'baker should state what time he starts working at so he receive orders in working times',
    example: '09:00:00',
  })
  startAt: string;
  @Validate(IsTimeConstraint)
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
    description:
      "baker should state what time he end working at so he won't receive orders after his working times",
    example: '13:00:00',
  })
  endAt: string;
}
