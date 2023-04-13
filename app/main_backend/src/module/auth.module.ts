import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';
import { DatabaseModule } from 'src/database/database.module';
import { adminPermissionUserProviders } from 'src/entities/admin-permission-user/admin-permission-user.providers';
import { adminAuthorityProviders } from 'src/entities/admin-authority/admin-authority.providers';
import { adminUserProviders } from 'src/entities/admin-user/admin-user.providers';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:
        process.env.NODE_SERVER_JWT_SECRET ||
        'security.authentication.jwt.base64-secret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [
    ...adminUserProviders,
    AuthService,
    JwtStrategy,
    ...adminAuthorityProviders,
    ...adminPermissionUserProviders,
  ],
  exports: [AuthService],
})
export class AuthModule {}
