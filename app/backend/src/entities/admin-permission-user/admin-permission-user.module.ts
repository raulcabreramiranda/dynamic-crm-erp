import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminPermissionUserRepository } from './admin-permission-user.repository';

import { AdminPermissionUserController } from './admin-permission-user.controller';

import { AdminPermissionUserService } from './admin-permission-user.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminPermissionUserRepository, UserRepository])],
    controllers: [AdminPermissionUserController],
    providers: [AdminPermissionUserService],
    exports: [AdminPermissionUserService],
})
export class AdminPermissionUserModule {}
