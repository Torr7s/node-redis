import IORedis, { Redis } from 'ioredis';

export const redis: Redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASS
});