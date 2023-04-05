import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminPermissionProfileController } from './admin-permission-profile.controller';

import { adminPermissionProfileProviders } from './admin-permission-profile.providers';

import { AdminPermissionProfileService } from './admin-permission-profile.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminPermissionProfileController],
    providers: [...adminPermissionProfileProviders, AdminPermissionProfileService],
    exports: [AdminPermissionProfileService],
})
export class AdminPermissionProfileModule {}
