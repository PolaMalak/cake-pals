import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BakersService } from 'src/bakers/bakers.service';
import { UsersTypeEnum } from 'src/enums/users-types.enum';
import hash from 'src/helpers/hash';
import { Baker } from 'src/models/baker.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bakersService: BakersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    type: UsersTypeEnum,
    email: string,
    password: string,
  ): Promise<any> {
    const user: User | Baker =
      type == UsersTypeEnum.REGULAR_USER
        ? await this.usersService.fineOneByEmailAndPassword(
            email,
            hash(password),
            [],
          )
        : await this.bakersService.fineOneByEmailAndPassword(
            email,
            hash(password),
            [],
          );
    if (user) {
      return user;
    }
    return null;
  }

  async fineOneByEmail(
    type: UsersTypeEnum,
    email: string,
  ): Promise<User | Baker> {
    if (type == UsersTypeEnum.REGULAR_USER) {
      return this.usersService.fineOneByEmail(email, []);
    } else {
      return this.bakersService.fineOneByEmail(email, []);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
