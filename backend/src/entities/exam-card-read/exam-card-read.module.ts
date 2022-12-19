import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamCardReadRepository } from './exam-card-read.repository';

import { ExamCardReadController } from './exam-card-read.controller';

import { ExamCardReadService } from './exam-card-read.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamCardReadRepository, UserRepository])],
    controllers: [ExamCardReadController],
    providers: [ExamCardReadService],
    exports: [ExamCardReadService],
})
export class ExamCardReadModule {}
