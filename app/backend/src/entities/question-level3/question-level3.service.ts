import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionLevel3 from './_base/question-level3.entity';
import { QuestionLevel3Repository } from './question-level3.repository';
import { QuestionLevel3Service as QuestionLevel3ServiceBase } from './_base/question-level3.service';

const relationshipNames = [];
relationshipNames.push('contentsMasterTeacher');
relationshipNames.push('level2');
relationshipNames.push('level4');
relationshipNames.push('questionLevels');
relationshipNames.push('examTemplate');

@Injectable({ scope: Scope.REQUEST })
export class QuestionLevel3Service extends QuestionLevel3ServiceBase {
    logger = new Logger('QuestionLevel3Service');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionLevel3Repository) protected questionLevel3Repository: QuestionLevel3Repository) {
        super(request, questionLevel3Repository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionLevel3Repository.count(options);
    }
}
