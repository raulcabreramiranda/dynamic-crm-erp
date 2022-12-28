import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { TrainingEnvironmentContentRepository } from './training-environment-content.repository';

import { TrainingEnvironmentContentController } from './training-environment-content.controller';

import { TrainingEnvironmentContentService } from './training-environment-content.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TrainingEnvironmentContentRepository, UserRepository])],
    controllers: [TrainingEnvironmentContentController],
    providers: [TrainingEnvironmentContentService],
    exports: [TrainingEnvironmentContentService],
})
export class TrainingEnvironmentContentModule {}
