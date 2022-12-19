import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Question from './_base/question.entity';
import { QuestionRepository } from './question.repository';
import { QuestionService as QuestionServiceBase } from './_base/question.service';

const relationshipNames = [];
relationshipNames.push('questionLevels');
relationshipNames.push('examTemplate');
relationshipNames.push('questionAlternative');
relationshipNames.push('questionText');

@Injectable({ scope: Scope.REQUEST })
export class QuestionService extends QuestionServiceBase {
    logger = new Logger('QuestionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionRepository) protected questionRepository: QuestionRepository) {
        super(request, questionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionRepository.count(options);
    }
}
