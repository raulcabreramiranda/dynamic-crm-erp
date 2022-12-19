import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionLevel4 from './_base/question-level4.entity';
import { QuestionLevel4Repository } from './question-level4.repository';
import { QuestionLevel4Service as QuestionLevel4ServiceBase } from './_base/question-level4.service';

const relationshipNames = [];
relationshipNames.push('level3');
relationshipNames.push('questionLevels');
relationshipNames.push('examTemplate');

@Injectable({ scope: Scope.REQUEST })
export class QuestionLevel4Service extends QuestionLevel4ServiceBase {
    logger = new Logger('QuestionLevel4Service');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionLevel4Repository) protected questionLevel4Repository: QuestionLevel4Repository) {
        super(request, questionLevel4Repository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionLevel4Repository.count(options);
    }
}
