import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionMatrix from './_base/question-matrix.entity';
import { QuestionMatrixRepository } from './question-matrix.repository';
import { QuestionMatrixService as QuestionMatrixServiceBase } from './_base/question-matrix.service';

const relationshipNames = [];
relationshipNames.push('level1');

@Injectable({ scope: Scope.REQUEST })
export class QuestionMatrixService extends QuestionMatrixServiceBase {
    logger = new Logger('QuestionMatrixService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionMatrixRepository) protected questionMatrixRepository: QuestionMatrixRepository) {
        super(request, questionMatrixRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionMatrixRepository.count(options);
    }
}
