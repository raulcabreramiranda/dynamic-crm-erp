import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminAuthorityRepository } from './admin-authority.repository';

import { AdminAuthorityController } from './admin-authority.controller';

import { adminAuthorityProviders } from './admin-authority.providers';

import { AdminAuthorityService } from './admin-authority.service';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [AdminAuthorityController],
    providers: [...adminAuthorityProviders, AdminAuthorityService],
    exports: [AdminAuthorityService],
})
export class AdminAuthorityModule {}
