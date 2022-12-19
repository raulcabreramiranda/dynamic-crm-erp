import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ConfigureCorrectionReviewer from './_base/configure-correction-reviewer.entity';
import { ConfigureCorrectionReviewerRepository } from './configure-correction-reviewer.repository';
import { ConfigureCorrectionReviewerService as ConfigureCorrectionReviewerServiceBase } from './_base/configure-correction-reviewer.service';

const relationshipNames = [];
relationshipNames.push('configureCorrection');
relationshipNames.push('user');

@Injectable({ scope: Scope.REQUEST })
export class ConfigureCorrectionReviewerService extends ConfigureCorrectionReviewerServiceBase {
    logger = new Logger('ConfigureCorrectionReviewerService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(ConfigureCorrectionReviewerRepository) protected configureCorrectionReviewerRepository: ConfigureCorrectionReviewerRepository,
    ) {
        super(request, configureCorrectionReviewerRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.configureCorrectionReviewerRepository.count(options);
    }
}
