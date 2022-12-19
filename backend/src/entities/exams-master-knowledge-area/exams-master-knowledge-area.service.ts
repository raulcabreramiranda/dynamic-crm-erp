import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamsMasterKnowledgeArea from './_base/exams-master-knowledge-area.entity';
import { ExamsMasterKnowledgeAreaRepository } from './exams-master-knowledge-area.repository';
import { ExamsMasterKnowledgeAreaService as ExamsMasterKnowledgeAreaServiceBase } from './_base/exams-master-knowledge-area.service';

const relationshipNames = [];
relationshipNames.push('masterTeacher');
relationshipNames.push('contentsMasterTeacher');
relationshipNames.push('examsMaster');
relationshipNames.push('knowledgeArea');

@Injectable({ scope: Scope.REQUEST })
export class ExamsMasterKnowledgeAreaService extends ExamsMasterKnowledgeAreaServiceBase {
    logger = new Logger('ExamsMasterKnowledgeAreaService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(ExamsMasterKnowledgeAreaRepository) protected examsMasterKnowledgeAreaRepository: ExamsMasterKnowledgeAreaRepository,
    ) {
        super(request, examsMasterKnowledgeAreaRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examsMasterKnowledgeAreaRepository.count(options);
    }
}
