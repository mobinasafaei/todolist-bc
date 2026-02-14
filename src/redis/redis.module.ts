// redis.module.ts
import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global() // اگه بخوای همه‌جا در دسترس باشه
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        return new Redis({
          host: '127.0.0.1',
          port: 6379,
          // password: process.env.REDIS_PASSWORD || undefined,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
