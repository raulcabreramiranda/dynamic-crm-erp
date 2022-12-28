import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { AdminWhiteLabelRepository } from './admin-white-label.repository';

import { AdminWhiteLabelController } from './admin-white-label.controller';

import { AdminWhiteLabelService } from './admin-white-label.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AdminWhiteLabelRepository, UserRepository])],
    controllers: [AdminWhiteLabelController],
    providers: [AdminWhiteLabelService],
    exports: [AdminWhiteLabelService],
})
export class AdminWhiteLabelModule {}
