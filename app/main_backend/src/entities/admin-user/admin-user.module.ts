import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminUserController } from './admin-user.controller';

import { adminUserProviders } from './admin-user.providers';

import { AdminUserService } from './admin-user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminUserController],
    providers: [...adminUserProviders, AdminUserService],
    exports: [AdminUserService],
})
export class AdminUserModule {}
