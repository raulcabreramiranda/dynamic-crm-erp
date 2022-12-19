import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { StudentExamRepository } from './student-exam.repository';

import { StudentExamController } from './student-exam.controller';

import { StudentExamService } from './student-exam.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([StudentExamRepository, UserRepository])],
    controllers: [StudentExamController],
    providers: [StudentExamService],
    exports: [StudentExamService],
})
export class StudentExamModule {}
