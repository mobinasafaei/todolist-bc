import { Controller, Post, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
