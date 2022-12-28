import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './payload.interface';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.NODE_SERVER_JWT_SECRET || 'jhipster.security.authentication.jwt.base64-secret',
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    if (payload.userType) {
      return done(null, {
        login: payload.username,
        email: payload.username,
        ...payload,
      });
    }
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException({ message: 'user does not exist' }), false);
    }

    return done(null, user);
  }
}
