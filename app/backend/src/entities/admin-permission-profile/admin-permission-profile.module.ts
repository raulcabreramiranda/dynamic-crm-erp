import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminPermissionProfileRepository } from './admin-permission-profile.repository';

import { AdminPermissionProfileController } from './admin-permission-profile.controller';

import { AdminPermissionProfileService } from './admin-permission-profile.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminPermissionProfileRepository, UserRepository])],
    controllers: [AdminPermissionProfileController],
    providers: [AdminPermissionProfileService],
    exports: [AdminPermissionProfileService],
})
export class AdminPermissionProfileModule {}
