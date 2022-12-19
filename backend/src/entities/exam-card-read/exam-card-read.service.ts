import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamCardRead from './_base/exam-card-read.entity';
import { ExamCardReadRepository } from './exam-card-read.repository';
import { ExamCardReadService as ExamCardReadServiceBase } from './_base/exam-card-read.service';

const relationshipNames = [];
relationshipNames.push('exam');
relationshipNames.push('studentExam');
relationshipNames.push('student');
relationshipNames.push('examCard');

@Injectable({ scope: Scope.REQUEST })
export class ExamCardReadService extends ExamCardReadServiceBase {
    logger = new Logger('ExamCardReadService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamCardReadRepository) protected examCardReadRepository: ExamCardReadRepository) {
        super(request, examCardReadRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examCardReadRepository.count(options);
    }
}
