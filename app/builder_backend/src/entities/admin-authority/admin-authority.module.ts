import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth.module';

import { AdminAuthorityController } from './admin-authority.controller';

import { adminAuthorityProviders } from './admin-authority.providers';

import { AdminAuthorityService } from './admin-authority.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminAuthorityController],
    providers: [...adminAuthorityProviders, AdminAuthorityService],
    exports: [AdminAuthorityService],
})
export class AdminAuthorityModule {}
