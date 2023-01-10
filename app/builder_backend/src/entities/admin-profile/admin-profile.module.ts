import { Module } from '@nestjs/common';
import { AuthModule } from '../../module/auth.module';

import { AdminProfileController } from './admin-profile.controller';

import { adminProfileProviders } from './admin-profile.providers';

import { AdminProfileService } from './admin-profile.service';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminProfileController],
    providers: [...adminProfileProviders, AdminProfileService],
    exports: [AdminProfileService],
})
export class AdminProfileModule {}
