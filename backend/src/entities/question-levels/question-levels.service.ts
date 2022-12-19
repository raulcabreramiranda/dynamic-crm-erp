import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionLevels from './_base/question-levels.entity';
import { QuestionLevelsRepository } from './question-levels.repository';
import { QuestionLevelsService as QuestionLevelsServiceBase } from './_base/question-levels.service';

const relationshipNames = [];
relationshipNames.push('question');
relationshipNames.push('level1');
relationshipNames.push('level2');
relationshipNames.push('level3');
relationshipNames.push('level4');

@Injectable({ scope: Scope.REQUEST })
export class QuestionLevelsService extends QuestionLevelsServiceBase {
    logger = new Logger('QuestionLevelsService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionLevelsRepository) protected questionLevelsRepository: QuestionLevelsRepository) {
        super(request, questionLevelsRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionLevelsRepository.count(options);
    }
}
