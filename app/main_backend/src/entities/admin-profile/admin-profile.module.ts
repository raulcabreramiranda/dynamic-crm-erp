import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminProfileRepository } from './admin-profile.repository';

import { AdminProfileController } from './admin-profile.controller';

import { AdminProfileService } from './admin-profile.service';
import { UserRepository } from '../../repository/user.repository';
import { AdminPermissionProfileRepository } from '../admin-permission-profile/admin-permission-profile.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminProfileRepository, UserRepository, AdminPermissionProfileRepository])],
    controllers: [AdminProfileController],
    providers: [AdminProfileService],
    exports: [AdminProfileService],
})
export class AdminProfileModule {}
