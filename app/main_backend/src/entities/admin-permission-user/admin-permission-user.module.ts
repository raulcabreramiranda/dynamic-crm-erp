import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminPermissionUserController } from './admin-permission-user.controller';

import { adminPermissionUserProviders } from './admin-permission-user.providers';

import { AdminPermissionUserService } from './admin-permission-user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminPermissionUserController],
    providers: [...adminPermissionUserProviders, AdminPermissionUserService],
    exports: [AdminPermissionUserService],
})
export class AdminPermissionUserModule {}
