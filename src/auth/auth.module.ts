import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { BakersModule } from 'src/bakers/bakers.module';
import { LocalBakerStrategy } from './bakers/local.strategy';
import { LocalUserStrategy } from './users/users.local.strategy';
import { JwtUserStrategy } from './users/jwt.strategy';
import { JwtBakerStrategy } from './bakers/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [
    LocalUserStrategy,
    JwtUserStrategy,
    LocalBakerStrategy,
    JwtBakerStrategy,
    AuthService,
  ],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.secret'),
        signOptions: { expiresIn: configService.get<number>('auth.expiry') },
      }),
    }),
    UsersModule,
    BakersModule,
  ],
  exports: [JwtModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
