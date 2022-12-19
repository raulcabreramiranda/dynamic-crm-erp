import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import StudentQuestion from './_base/student-question.entity';
import { StudentQuestionRepository } from './student-question.repository';
import { StudentQuestionService as StudentQuestionServiceBase } from './_base/student-question.service';

const relationshipNames = [];
relationshipNames.push('studentExam');
relationshipNames.push('examTemplate');
relationshipNames.push('teacher');

@Injectable({ scope: Scope.REQUEST })
export class StudentQuestionService extends StudentQuestionServiceBase {
    logger = new Logger('StudentQuestionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(StudentQuestionRepository) protected studentQuestionRepository: StudentQuestionRepository) {
        super(request, studentQuestionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.studentQuestionRepository.count(options);
    }
}
