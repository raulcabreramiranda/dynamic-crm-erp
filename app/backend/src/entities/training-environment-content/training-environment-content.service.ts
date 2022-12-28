import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import TrainingEnvironmentContent from './_base/training-environment-content.entity';
import { TrainingEnvironmentContentRepository } from './training-environment-content.repository';
import { TrainingEnvironmentContentService as TrainingEnvironmentContentServiceBase } from './_base/training-environment-content.service';

const relationshipNames = [];
relationshipNames.push('trainingEnvironmentComponent');

@Injectable({ scope: Scope.REQUEST })
export class TrainingEnvironmentContentService extends TrainingEnvironmentContentServiceBase {
    logger = new Logger('TrainingEnvironmentContentService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(TrainingEnvironmentContentRepository) protected trainingEnvironmentContentRepository: TrainingEnvironmentContentRepository,
    ) {
        super(request, trainingEnvironmentContentRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.trainingEnvironmentContentRepository.count(options);
    }
}
