import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminPermissionRepository } from './admin-permission.repository';

import { AdminPermissionController } from './admin-permission.controller';

import { AdminPermissionService } from './admin-permission.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminPermissionRepository, UserRepository])],
    controllers: [AdminPermissionController],
    providers: [AdminPermissionService],
    exports: [AdminPermissionService],
})
export class AdminPermissionModule {}
