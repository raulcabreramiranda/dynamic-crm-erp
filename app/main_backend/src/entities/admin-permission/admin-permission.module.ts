import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminPermissionRepository } from './admin-permission.repository';

import { AdminPermissionController } from './admin-permission.controller';

import { adminPermissionProviders } from './admin-permission.providers';

import { AdminPermissionService } from './admin-permission.service';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminPermissionController],
    providers: [...adminPermissionProviders, AdminPermissionService],
    exports: [AdminPermissionService],
})
export class AdminPermissionModule {}
