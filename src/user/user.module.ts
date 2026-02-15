import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { StrongPasswordConstraint } from './validators/strong-password.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService,StrongPasswordConstraint],
  controllers: [UserController],
})
export class UserModule {}
