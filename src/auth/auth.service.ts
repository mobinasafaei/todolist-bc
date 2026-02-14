// auth.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setTestValue(key: string, value: string) {
    await this.redisClient.set(key, value);
    return 'ok';
  }

  async getTestValue(key: string) {
    return await this.redisClient.get(key);
  }
}
