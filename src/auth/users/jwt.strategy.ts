import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersTypeEnum } from 'src/enums/users-types.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'users-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.secret'),
    });
  }

  async validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userData = await this.authService.fineOneByEmail(
      UsersTypeEnum.REGULAR_USER,
      payload.email,
    );
    return userData;
  }
}
