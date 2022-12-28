import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import TrainingEnvironmentComponent from './_base/training-environment-component.entity';
import { TrainingEnvironmentComponentRepository } from './training-environment-component.repository';
import { TrainingEnvironmentComponentService as TrainingEnvironmentComponentServiceBase } from './_base/training-environment-component.service';

const relationshipNames = [];
relationshipNames.push('trainingEnvironment');
relationshipNames.push('trainingEnvironmentContent');

@Injectable({ scope: Scope.REQUEST })
export class TrainingEnvironmentComponentService extends TrainingEnvironmentComponentServiceBase {
    logger = new Logger('TrainingEnvironmentComponentService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(TrainingEnvironmentComponentRepository) protected trainingEnvironmentComponentRepository: TrainingEnvironmentComponentRepository,
    ) {
        super(request, trainingEnvironmentComponentRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.trainingEnvironmentComponentRepository.count(options);
    }
}
