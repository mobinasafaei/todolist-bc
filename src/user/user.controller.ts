import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async read(@Param('id') id: string): Promise<User> {
    return this.userService.read(+id);
  }
}
