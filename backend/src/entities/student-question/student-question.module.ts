import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../module/auth.module';
import { StudentQuestionRepository } from './student-question.repository';

import { StudentQuestionController } from './student-question.controller';

import { StudentQuestionService } from './student-question.service';
import { UserRepository } from '../../repository/user.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([StudentQuestionRepository, UserRepository])],
    controllers: [StudentQuestionController],
    providers: [StudentQuestionService],
    exports: [StudentQuestionService],
})
export class StudentQuestionModule {}
