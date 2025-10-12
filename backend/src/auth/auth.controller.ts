import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/jwt-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import type { Response } from 'express';
import { Public } from './decorators/public.decorators';
import { Roles } from './decorators/role.decorators';
import { RolesGuard } from './guards/roles/roles.guard';
import { Role } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: any) {
    return this.authService.login(req.user.id, req.user.name, req.user.role);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return { message: 'Hello ' + req.user.name };
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Get('protacted')
  getProtactedRoute(@Request() req: any) {
    return { message: 'Hello ' + req.user.name };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async getRefresh(@Request() req: any) {
    const user = req.user;
    return await this.authService.refresh(user.id, user.name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(
      req.user.id,
      req.user.name,
      req.user.role,
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&role=${response.role}`,
    );
  }

  @Post('signout')
  signout(@Req() req) {
    return this.authService.signout(req.user.id);
  }
}
