import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BakersModule } from './bakers/bakers.module';
import { DatabaseModule } from './database/database.module';
import authConfig from './config/auth.config';
import { PassportModule } from '@nestjs/passport';
import { ProductsModule } from './products/products.module';
import { SchedulesModule } from './schedules/schedules.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    PassportModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    BakersModule,
    ProductsModule,
    SchedulesModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
