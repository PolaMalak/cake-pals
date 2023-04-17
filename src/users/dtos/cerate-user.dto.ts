import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  Matches,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'baker name should not be empty' })
  @IsString()
  @MaxLength(50)
  @ApiProperty({ nullable: false, description: 'baker name' })
  name: string;
  @IsString()
  @IsNotEmpty({ message: 'baker email should not be empty' })
  @ApiProperty({ nullable: false, description: 'baker email' })
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password should be more than 8 characters with at least one lower, upper case letter and special character',
  })
  password: string;
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty()
  longitude: number;
}
