import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string): Promise<any> {
    if (password.length < 6) {
      throw new Error('Password must be at least 8 characters long');
    }
    return this.authService.validateLocalUser(email, password);
  }
}
