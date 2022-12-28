import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamType from './_base/exam-type.entity';
import { ExamTypeRepository } from './exam-type.repository';
import { ExamTypeService as ExamTypeServiceBase } from './_base/exam-type.service';

const relationshipNames = [];
relationshipNames.push('exam');

@Injectable({ scope: Scope.REQUEST })
export class ExamTypeService extends ExamTypeServiceBase {
    logger = new Logger('ExamTypeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamTypeRepository) protected examTypeRepository: ExamTypeRepository) {
        super(request, examTypeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examTypeRepository.count(options);
    }
}
