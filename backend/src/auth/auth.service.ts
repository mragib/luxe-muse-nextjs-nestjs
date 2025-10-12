import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { hash, verify } from 'argon2';
import refreshConfig from 'src/config/refresh.config';
import { SessionService } from 'src/session/session.service';
import { JWTPayload, Role } from 'src/types/types';

import {
  CreateGoogleUserDto,
  CreateUserDto,
} from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    @Inject(refreshConfig.KEY)
    private refreshConfigaration: ConfigType<typeof refreshConfig>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async login(userId: string, name: string, role: Role) {
    const { accessToken, refreshToken } = await this.generateToken(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      name,
      role,
      accessToken,
      refreshToken,
    };
  }

  async generateToken(userId: string) {
    const payload: JWTPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshConfigaration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUserById(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    const isRefreshTokenValid = await verify(user.refreshToken!, refreshToken);

    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid refresh token');

    return {
      id: user.id,
      name: user.name,
    };
  }

  async refresh(userId: string, name: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      name,
      accessToken,
      refreshToken,
    };
  }

  async validateGooleUser(googleUser: CreateGoogleUserDto) {
    const foundUser = await this.userService.findByEmail(googleUser.email);

    if (foundUser) return foundUser;

    const newUser = await this.userService.createGoogleUser(googleUser);
    return newUser;
  }

  async signout(id: string) {
    await this.sessionService.remove(id);
    return await this.userService.updateRefreshToken(id, null);
  }
}
