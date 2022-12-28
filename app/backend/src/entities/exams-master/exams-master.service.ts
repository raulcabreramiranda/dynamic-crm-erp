import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamsMaster from './_base/exams-master.entity';
import { ExamsMasterRepository } from './exams-master.repository';
import { ExamsMasterService as ExamsMasterServiceBase } from './_base/exams-master.service';

const relationshipNames = [];
relationshipNames.push('examsMasterKnowledgeArea');
relationshipNames.push('master');
relationshipNames.push('exam');

@Injectable({ scope: Scope.REQUEST })
export class ExamsMasterService extends ExamsMasterServiceBase {
    logger = new Logger('ExamsMasterService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamsMasterRepository) protected examsMasterRepository: ExamsMasterRepository) {
        super(request, examsMasterRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examsMasterRepository.count(options);
    }
}
