import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateBakerDto } from 'src/bakers/dtos/add-baker.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/cerate-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }
}
