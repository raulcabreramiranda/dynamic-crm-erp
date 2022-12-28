import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { ExamsMasterRepository } from './exams-master.repository';

import { ExamsMasterController } from './exams-master.controller';

import { ExamsMasterService } from './exams-master.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([ExamsMasterRepository, UserRepository])],
    controllers: [ExamsMasterController],
    providers: [ExamsMasterService],
    exports: [ExamsMasterService],
})
export class ExamsMasterModule {}
