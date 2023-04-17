import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('redis.host'),
        port: configService.get<string>('redis.port'),
        isGlobal: true,
        max: configService.get<number>('redis.max'),
        ttl: configService.get<number>('redis.ttl'),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
