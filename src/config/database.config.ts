import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  host: `${process.env.MYSQL_HOST}`,
  name: `${process.env.MYSQL_DB_NAME}`,
  port: Number(process.env.MYSQL_PORT),
}));
