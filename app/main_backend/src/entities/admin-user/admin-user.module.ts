import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminUserRepository } from './admin-user.repository';

import { AdminUserController } from './admin-user.controller';

import { adminUserProviders } from './admin-user.providers';

import { AdminUserService } from './admin-user.service';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminUserController],
    providers: [...adminUserProviders, AdminUserService],
    exports: [AdminUserService],
})
export class AdminUserModule {}
