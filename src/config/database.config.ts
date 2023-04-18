import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: `${process.env.MYSQL_USER}` || '',
  password: `${process.env.MYSQL_PASSWORD}` || '',
  host: `${process.env.MYSQL_HOST}` || 'localhost',
  name: `${process.env.MYSQL_DB_NAME}` || 'cake-pals-db',
  port: Number(process.env.MYSQL_PORT) || 3308,
}));
