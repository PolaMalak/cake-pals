import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baker } from 'src/models/baker.entity';
import { Product } from 'src/models/product.entity';
import { Schedule } from 'src/models/schedule.entity';
import { User } from 'src/models/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        timezone: 'UTC',
        synchronize: false,
        autoLoadEntities: true,
        migrations: ['./migrations/*{.ts,.js}'],
        migrationsRun: true,
        logging: config.get<boolean>('APP_DEBUG', true),
        entities: [Baker, User, Product, Schedule],
      }),
    }),
  ],
})
export class DatabaseModule {}
