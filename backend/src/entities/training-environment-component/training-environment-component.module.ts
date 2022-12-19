import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { TrainingEnvironmentComponentRepository } from './training-environment-component.repository';

import { TrainingEnvironmentComponentController } from './training-environment-component.controller';

import { TrainingEnvironmentComponentService } from './training-environment-component.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TrainingEnvironmentComponentRepository, UserRepository])],
    controllers: [TrainingEnvironmentComponentController],
    providers: [TrainingEnvironmentComponentService],
    exports: [TrainingEnvironmentComponentService],
})
export class TrainingEnvironmentComponentModule {}
