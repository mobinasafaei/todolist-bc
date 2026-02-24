import { Controller, Req, Get, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import type { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('me')
  me(@Req() req: Request) {
    if (!req.user) throw new UnauthorizedException();
    return this.userService.read(req.user.userId);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<User> {
    return this.userService.read(+id);
  }
}
