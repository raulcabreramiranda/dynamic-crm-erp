import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import TrainingEnvironment from './_base/training-environment.entity';
import { TrainingEnvironmentRepository } from './training-environment.repository';
import { TrainingEnvironmentService as TrainingEnvironmentServiceBase } from './_base/training-environment.service';

const relationshipNames = [];
relationshipNames.push('trainingEnvironmentComponent');

@Injectable({ scope: Scope.REQUEST })
export class TrainingEnvironmentService extends TrainingEnvironmentServiceBase {
    logger = new Logger('TrainingEnvironmentService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(TrainingEnvironmentRepository) protected trainingEnvironmentRepository: TrainingEnvironmentRepository) {
        super(request, trainingEnvironmentRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.trainingEnvironmentRepository.count(options);
    }
}
