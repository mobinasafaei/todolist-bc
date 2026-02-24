import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.servicee';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('incorrect credentials');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('incorrect credentials');
    }
    const payload = {
      userId: user.id,
      email: user.email,
      sessionId: uuidv4(),
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: '7d',
    });

    await this.redisService.setRefreshToken(
      user.id,
      payload.sessionId,
      refresh_token,
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      sessionId: payload.sessionId,
    };
  }

  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
    });
    const storedRefreshToken = await this.redisService.getRefreshToken(
      payload.userId,
      payload.sessionId,
    );
    const newTokensPayLoad = {
      userId: payload.userId,
      sessionId: payload.sessionId,
      email: payload.email,
    };
    if (storedRefreshToken === refreshToken) {
      const access_token = await this.jwtService.signAsync(newTokensPayLoad, {
        expiresIn: '15m',
      });
      const refresh_token = await this.jwtService.signAsync(newTokensPayLoad, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '7d',
      });
      this.redisService.setRefreshToken(
        payload.userId,
        payload.sessionId,
        refresh_token,
      );
      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        sessionId: payload.sessionId,
      };
    } else {
      throw new UnauthorizedException('you should log in');
    }
  }
}
