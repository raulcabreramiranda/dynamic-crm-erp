import { Module } from '@nestjs/common';

import { UserController } from '../web/rest/user.controller';
import { UserService } from '../service/user.service';
import { adminAuditEntityProviders } from 'src/entities/admin-audit-entity/admin-audit-entity.providers';
import { DatabaseModule } from 'src/database/database.module';
import { adminUserProviders } from 'src/entities/admin-user/admin-user.providers';
import { adminPermissionProfileProviders } from 'src/entities/admin-permission-profile/admin-permission-profile.providers';
import { adminProfileProviders } from 'src/entities/admin-profile/admin-profile.providers';
import { adminPermissionUserProviders } from 'src/entities/admin-permission-user/admin-permission-user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...adminAuditEntityProviders,
    ...adminUserProviders,
    ...adminPermissionProfileProviders,
    ...adminProfileProviders,
    ...adminPermissionUserProviders, 
    UserService
  ],
  exports: [UserService],
})
export class UserModule {}
