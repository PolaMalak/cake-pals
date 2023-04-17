import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: `${process.env.REDIS_HOST}` || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  ttl: Number(process.env.REDIS_TTL),
  max: Number(process.env.REDIS_MAX),
}));
