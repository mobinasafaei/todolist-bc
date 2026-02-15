import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, RedisModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
