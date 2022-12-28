import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import StudentExam from './_base/student-exam.entity';
import { StudentExamRepository } from './student-exam.repository';
import { StudentExamService as StudentExamServiceBase } from './_base/student-exam.service';

const relationshipNames = [];
relationshipNames.push('cerneClass');
relationshipNames.push('studentQuestion');
relationshipNames.push('exam');
relationshipNames.push('student');
relationshipNames.push('examCardRead');

@Injectable({ scope: Scope.REQUEST })
export class StudentExamService extends StudentExamServiceBase {
    logger = new Logger('StudentExamService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(StudentExamRepository) protected studentExamRepository: StudentExamRepository) {
        super(request, studentExamRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.studentExamRepository.count(options);
    }
}
