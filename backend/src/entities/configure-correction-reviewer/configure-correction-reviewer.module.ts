import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ConfigureCorrectionReviewerRepository } from './configure-correction-reviewer.repository';

import { ConfigureCorrectionReviewerController } from './configure-correction-reviewer.controller';

import { ConfigureCorrectionReviewerService } from './configure-correction-reviewer.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ConfigureCorrectionReviewerRepository, UserRepository])],
    controllers: [ConfigureCorrectionReviewerController],
    providers: [ConfigureCorrectionReviewerService],
    exports: [ConfigureCorrectionReviewerService],
})
export class ConfigureCorrectionReviewerModule {}
