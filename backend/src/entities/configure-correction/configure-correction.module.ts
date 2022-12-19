import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ConfigureCorrectionRepository } from './configure-correction.repository';

import { ConfigureCorrectionController } from './configure-correction.controller';

import { ConfigureCorrectionService } from './configure-correction.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ConfigureCorrectionRepository, UserRepository])],
    controllers: [ConfigureCorrectionController],
    providers: [ConfigureCorrectionService],
    exports: [ConfigureCorrectionService],
})
export class ConfigureCorrectionModule {}
