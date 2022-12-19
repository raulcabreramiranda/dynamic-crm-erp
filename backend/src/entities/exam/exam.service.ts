import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Exam from './_base/exam.entity';
import { ExamRepository } from './exam.repository';
import { ExamService as ExamServiceBase } from './_base/exam.service';

const relationshipNames = [];
relationshipNames.push('examConfigureApplication');
relationshipNames.push('studentExam');
relationshipNames.push('examCardRead');
relationshipNames.push('examsMaster');
relationshipNames.push('discipline');
relationshipNames.push('examTemplate');
relationshipNames.push('examType');
relationshipNames.push('cerneDegree');

@Injectable({ scope: Scope.REQUEST })
export class ExamService extends ExamServiceBase {
    logger = new Logger('ExamService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamRepository) protected examRepository: ExamRepository) {
        super(request, examRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examRepository.count(options);
    }
}
