import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import DisciplineSuperPro from './_base/discipline-super-pro.entity';
import { DisciplineSuperProRepository } from './discipline-super-pro.repository';
import { DisciplineSuperProService as DisciplineSuperProServiceBase } from './_base/discipline-super-pro.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class DisciplineSuperProService extends DisciplineSuperProServiceBase {
    logger = new Logger('DisciplineSuperProService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(DisciplineSuperProRepository) protected disciplineSuperProRepository: DisciplineSuperProRepository) {
        super(request, disciplineSuperProRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.disciplineSuperProRepository.count(options);
    }
}
