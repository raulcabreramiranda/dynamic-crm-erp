import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionLevel2 from './_base/question-level2.entity';
import { QuestionLevel2Repository } from './question-level2.repository';
import { QuestionLevel2Service as QuestionLevel2ServiceBase } from './_base/question-level2.service';

const relationshipNames = [];
relationshipNames.push('level1');
relationshipNames.push('level3');
relationshipNames.push('questionLevels');
relationshipNames.push('examTemplate');

@Injectable({ scope: Scope.REQUEST })
export class QuestionLevel2Service extends QuestionLevel2ServiceBase {
    logger = new Logger('QuestionLevel2Service');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionLevel2Repository) protected questionLevel2Repository: QuestionLevel2Repository) {
        super(request, questionLevel2Repository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionLevel2Repository.count(options);
    }
}
