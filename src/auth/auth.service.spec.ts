import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import Redis from 'ioredis';

describe('AuthService with Redis', () => {
  let service: AuthService;
  let redisClient: Redis;

  beforeAll(() => {
    // اتصال واقعی به Redis
    redisClient = new Redis({
      host: '127.0.0.1',
      port: 6379,
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'REDIS_CLIENT', useValue: redisClient },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await redisClient.quit(); // بستن کانکشن بعد از تست
  });

  it('should set id=1 in Redis', async () => {
    await redisClient.set('user_id', '1'); // ست کردن id=1
    const value = await redisClient.get('user_id'); // گرفتن مقدار
    console.log('Value from Redis:', value); // باید 1 چاپ بشه
    expect(value).toBe('1');
  });
});
