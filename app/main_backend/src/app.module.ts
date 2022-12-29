import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PhotoModule } from './entities/photo/photo.module';

import { AdminAuditEntityModule } from './entities/admin-audit-entity/admin-audit-entity.module';
import { AdminAuthorityModule } from './entities/admin-authority/admin-authority.module';
import { AdminPermissionModule } from './entities/admin-permission/admin-permission.module';
import { AdminPermissionProfileModule } from './entities/admin-permission-profile/admin-permission-profile.module';
import { AdminPermissionUserModule } from './entities/admin-permission-user/admin-permission-user.module';
import { AdminProfileModule } from './entities/admin-profile/admin-profile.module';
import { AdminUserModule } from './entities/admin-user/admin-user.module';
import { AdminWhiteLabelModule } from './entities/admin-white-label/admin-white-label.module';

@Module({
  imports: [
    DatabaseModule,
    AdminAuditEntityModule,
    AdminAuthorityModule,
    AdminPermissionModule,
    AdminPermissionProfileModule,
    AdminPermissionUserModule,
    AdminProfileModule,
    AdminUserModule,
    AdminWhiteLabelModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
