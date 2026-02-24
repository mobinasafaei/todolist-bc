import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async setRefreshToken(userId: number, sessionId: string, token: string) {
    const key = `${userId}:${sessionId}`;
    await this.redis.set(key, token, 'EX', 60 * 60 * 24 * 7); 
  }

  async getRefreshToken(userId: number, sessionId: string) {
    const key = `${userId}:${sessionId}`;
    return this.redis.get(key);
  }

  async deleteRefreshToken(userId: number, sessionId: string) {
    const key = `${userId}:${sessionId}`;
    await this.redis.del(key);
  }
}