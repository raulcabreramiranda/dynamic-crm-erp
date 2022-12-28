import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Essay from './_base/essay.entity';
import { EssayRepository } from './essay.repository';
import { EssayService as EssayServiceBase } from './_base/essay.service';

const relationshipNames = [];
relationshipNames.push('essayPreUpload');
relationshipNames.push('cerneClass');
relationshipNames.push('jorneyDegree');
relationshipNames.push('user');
relationshipNames.push('matrix');
relationshipNames.push('configureApplication');
relationshipNames.push('configureCorrection');
relationshipNames.push('essayResults');
relationshipNames.push('reviewUser');
relationshipNames.push('essayExternalReviews');

@Injectable({ scope: Scope.REQUEST })
export class EssayService extends EssayServiceBase {
    logger = new Logger('EssayService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(EssayRepository) protected essayRepository: EssayRepository) {
        super(request, essayRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.essayRepository.count(options);
    }
}
