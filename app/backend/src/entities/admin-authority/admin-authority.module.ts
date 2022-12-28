import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminAuthorityRepository } from './admin-authority.repository';

import { AdminAuthorityController } from './admin-authority.controller';

import { AdminAuthorityService } from './admin-authority.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminAuthorityRepository, UserRepository])],
    controllers: [AdminAuthorityController],
    providers: [AdminAuthorityService],
    exports: [AdminAuthorityService],
})
export class AdminAuthorityModule {}
