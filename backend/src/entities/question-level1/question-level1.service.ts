import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionLevel1 from './_base/question-level1.entity';
import { QuestionLevel1Repository } from './question-level1.repository';
import { QuestionLevel1Service as QuestionLevel1ServiceBase } from './_base/question-level1.service';

const relationshipNames = [];
relationshipNames.push('matrix');
relationshipNames.push('level2');
relationshipNames.push('questionLevels');

@Injectable({ scope: Scope.REQUEST })
export class QuestionLevel1Service extends QuestionLevel1ServiceBase {
    logger = new Logger('QuestionLevel1Service');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionLevel1Repository) protected questionLevel1Repository: QuestionLevel1Repository) {
        super(request, questionLevel1Repository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionLevel1Repository.count(options);
    }
}
