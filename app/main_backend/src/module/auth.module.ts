import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.NODE_SERVER_JWT_SECRET || 'security.authentication.jwt.base64-secret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
