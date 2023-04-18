import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();
console.log(
  configService.get('MYSQL_HOST'),
  configService.get('MYSQL_PORT'),
  configService.get('MYSQL_USER'),
  configService.get('MYSQL_PASSWORD'),
  configService.get('MYSQL_DB_NAME'),
);
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get('MYSQL_HOST'),
  port: configService.get('MYSQL_PORT'),
  username: configService.get('MYSQL_USER'),
  password: configService.get('MYSQL_PASSWORD'),
  database: configService.get('MYSQL_DB_NAME'),
  entities: ['src/models/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['migrations/*.ts'],
});
