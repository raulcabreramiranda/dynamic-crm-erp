import { Module } from '@nestjs/common';

import { UserController } from '../web/rest/user.controller';
import { UserRepository } from '../repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../service/user.service';
import { AdminAuditEntityRepository as AuditEntityRepository } from '../entities/admin-audit-entity/admin-audit-entity.repository';
import { AdminProfileRepository as ProfileRepository } from '../entities/admin-profile/admin-profile.repository';
import { AdminPermissionProfileRepository as PermissionProfileRepository } from '../entities/admin-permission-profile/admin-permission-profile.repository';
import { AdminPermissionUserRepository as PermissionUserRepository } from '../entities/admin-permission-user/admin-permission-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, AuditEntityRepository, ProfileRepository, PermissionProfileRepository, PermissionUserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
