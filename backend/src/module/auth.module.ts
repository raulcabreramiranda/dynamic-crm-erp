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
import { AdminAuthorityRepository as AuthorityRepository } from '../entities/admin-authority/admin-authority.repository';
import { CerneDegreeRepository } from '../entities/cerne-degree/cerne-degree.repository';
import { JorneyRepository } from '../entities/jorney/jorney.repository';

import { AdminPermissionProfileRepository as PermissionProfileRepository } from '../entities/admin-permission-profile/admin-permission-profile.repository';
import { AdminPermissionUserRepository as PermissionUserRepository } from '../entities/admin-permission-user/admin-permission-user.repository';
import { AdminUserSuperProRepository } from '../entities/admin-user-super-pro/admin-user-super-pro.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorityRepository, PermissionUserRepository, PermissionProfileRepository, CerneDegreeRepository, AdminUserSuperProRepository, JorneyRepository]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.NODE_SERVER_JWT_SECRET || 'jhipster.security.authentication.jwt.base64-secret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
