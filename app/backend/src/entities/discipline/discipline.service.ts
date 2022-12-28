import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Discipline from './_base/discipline.entity';
import { DisciplineRepository } from './discipline.repository';
import { DisciplineService as DisciplineServiceBase } from './_base/discipline.service';

const relationshipNames = [];
relationshipNames.push('exam');
relationshipNames.push('knowledgeArea');
relationshipNames.push('masterTeacher');
relationshipNames.push('cernePlataformUser');
relationshipNames.push('contents');
relationshipNames.push('examTemplate');

@Injectable({ scope: Scope.REQUEST })
export class DisciplineService extends DisciplineServiceBase {
    logger = new Logger('DisciplineService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(DisciplineRepository) protected disciplineRepository: DisciplineRepository) {
        super(request, disciplineRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.disciplineRepository.count(options);
    }
}
