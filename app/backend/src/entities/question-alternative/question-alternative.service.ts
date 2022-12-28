import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionAlternative from './_base/question-alternative.entity';
import { QuestionAlternativeRepository } from './question-alternative.repository';
import { QuestionAlternativeService as QuestionAlternativeServiceBase } from './_base/question-alternative.service';

const relationshipNames = [];
relationshipNames.push('question');

@Injectable({ scope: Scope.REQUEST })
export class QuestionAlternativeService extends QuestionAlternativeServiceBase {
    logger = new Logger('QuestionAlternativeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionAlternativeRepository) protected questionAlternativeRepository: QuestionAlternativeRepository) {
        super(request, questionAlternativeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionAlternativeRepository.count(options);
    }
}
