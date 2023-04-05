import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminPermissionController } from './admin-permission.controller';

import { adminPermissionProviders } from './admin-permission.providers';

import { AdminPermissionService } from './admin-permission.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminPermissionController],
    providers: [...adminPermissionProviders, AdminPermissionService],
    exports: [AdminPermissionService],
})
export class AdminPermissionModule {}
