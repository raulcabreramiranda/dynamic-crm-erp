import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminUserRepository } from './admin-user.repository';

import { AdminUserController } from './admin-user.controller';

import { AdminUserService } from './admin-user.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminUserRepository, UserRepository])],
    controllers: [AdminUserController],
    providers: [AdminUserService],
    exports: [AdminUserService],
})
export class AdminUserModule {}
