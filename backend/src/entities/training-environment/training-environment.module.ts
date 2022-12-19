import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { TrainingEnvironmentRepository } from './training-environment.repository';

import { TrainingEnvironmentController } from './training-environment.controller';

import { TrainingEnvironmentService } from './training-environment.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TrainingEnvironmentRepository, UserRepository])],
    controllers: [TrainingEnvironmentController],
    providers: [TrainingEnvironmentService],
    exports: [TrainingEnvironmentService],
})
export class TrainingEnvironmentModule {}
