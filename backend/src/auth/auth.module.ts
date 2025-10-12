import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from 'src/session/session.module';
import jwtConfig from 'src/config/jwt.config';
import refreshConfig from 'src/config/refresh.config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    jwtStrategy,
    RefreshStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
