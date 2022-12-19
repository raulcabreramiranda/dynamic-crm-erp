import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamConfigureApplicationRepository } from './exam-configure-application.repository';

import { ExamConfigureApplicationController } from './exam-configure-application.controller';

import { ExamConfigureApplicationService } from './exam-configure-application.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamConfigureApplicationRepository, UserRepository])],
    controllers: [ExamConfigureApplicationController],
    providers: [ExamConfigureApplicationService],
    exports: [ExamConfigureApplicationService],
})
export class ExamConfigureApplicationModule {}
