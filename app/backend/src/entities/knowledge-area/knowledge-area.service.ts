import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import KnowledgeArea from './_base/knowledge-area.entity';
import { KnowledgeAreaRepository } from './knowledge-area.repository';
import { KnowledgeAreaService as KnowledgeAreaServiceBase } from './_base/knowledge-area.service';

const relationshipNames = [];
relationshipNames.push('examsMasterKnowledgeArea');
relationshipNames.push('disciplines');

@Injectable({ scope: Scope.REQUEST })
export class KnowledgeAreaService extends KnowledgeAreaServiceBase {
    logger = new Logger('KnowledgeAreaService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(KnowledgeAreaRepository) protected knowledgeAreaRepository: KnowledgeAreaRepository) {
        super(request, knowledgeAreaRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.knowledgeAreaRepository.count(options);
    }
}
