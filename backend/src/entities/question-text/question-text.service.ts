import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionText from './_base/question-text.entity';
import { QuestionTextRepository } from './question-text.repository';
import { QuestionTextService as QuestionTextServiceBase } from './_base/question-text.service';

const relationshipNames = [];
relationshipNames.push('question');

@Injectable({ scope: Scope.REQUEST })
export class QuestionTextService extends QuestionTextServiceBase {
    logger = new Logger('QuestionTextService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionTextRepository) protected questionTextRepository: QuestionTextRepository) {
        super(request, questionTextRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionTextRepository.count(options);
    }
}
