import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { AuthService } from '../auth.service';
import { JWTPayload } from 'src/types/types';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret!,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
