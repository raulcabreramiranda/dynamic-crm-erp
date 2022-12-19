import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminUserSuperProRepository } from './admin-user-super-pro.repository';

import { AdminUserSuperProController } from './admin-user-super-pro.controller';

import { AdminUserSuperProService } from './admin-user-super-pro.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminUserSuperProRepository, UserRepository])],
    controllers: [AdminUserSuperProController],
    providers: [AdminUserSuperProService],
    exports: [AdminUserSuperProService],
})
export class AdminUserSuperProModule {}
