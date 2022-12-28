import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ConfigureCorrection from './_base/configure-correction.entity';
import { ConfigureCorrectionRepository } from './configure-correction.repository';
import { ConfigureCorrectionService as ConfigureCorrectionServiceBase } from './_base/configure-correction.service';

const relationshipNames = [];
relationshipNames.push('essays');
relationshipNames.push('cerneClass');
relationshipNames.push('theme');
relationshipNames.push('configureCorrectionReviewers');
relationshipNames.push('jorneyDegree');

@Injectable({ scope: Scope.REQUEST })
export class ConfigureCorrectionService extends ConfigureCorrectionServiceBase {
    logger = new Logger('ConfigureCorrectionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ConfigureCorrectionRepository) protected configureCorrectionRepository: ConfigureCorrectionRepository) {
        super(request, configureCorrectionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.configureCorrectionRepository.count(options);
    }
}
