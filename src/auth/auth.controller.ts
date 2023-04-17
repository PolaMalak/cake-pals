import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalUserAuthGuard } from './users/user.guard';
import { LocalBakerAuthGuard } from './bakers/baker.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      example: { email: 'user@example.com', password: '123456' },
    },
  })
  @UseGuards(LocalUserAuthGuard)
  @Post('/user/login')
  async userLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBody({
    schema: {
      type: 'object',
      example: { email: 'baker@example.com', password: '123456' },
    },
  })
  @UseGuards(LocalBakerAuthGuard)
  @Post('/baker/login')
  async bakerLogin(@Request() req) {
    return this.authService.login(req.user);
  }
}
