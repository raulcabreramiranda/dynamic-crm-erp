import { Module } from '@nestjs/common';
import { AuthModule } from '../../module/auth.module';

import { AdminWhiteLabelController } from './admin-white-label.controller';

import { adminWhiteLabelProviders } from './admin-white-label.providers';

import { AdminWhiteLabelService } from './admin-white-label.service';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminWhiteLabelController],
    providers: [...adminWhiteLabelProviders, AdminWhiteLabelService],
    exports: [AdminWhiteLabelService],
})
export class AdminWhiteLabelModule {}
