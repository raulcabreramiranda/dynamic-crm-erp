import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import EssayResult from './_base/essay-result.entity';
import { EssayResultRepository } from './essay-result.repository';
import { EssayResultService as EssayResultServiceBase } from './_base/essay-result.service';

const relationshipNames = [];
relationshipNames.push('reviewer');
relationshipNames.push('essay');
relationshipNames.push('skillItem');
relationshipNames.push('essayResultComment');
relationshipNames.push('skillItemFinal');
relationshipNames.push('matrixAnnulmentReason');

@Injectable({ scope: Scope.REQUEST })
export class EssayResultService extends EssayResultServiceBase {
    logger = new Logger('EssayResultService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(EssayResultRepository) protected essayResultRepository: EssayResultRepository) {
        super(request, essayResultRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.essayResultRepository.count(options);
    }
}
