import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionType from './_base/question-type.entity';
import { QuestionTypeRepository } from './question-type.repository';
import { QuestionTypeService as QuestionTypeServiceBase } from './_base/question-type.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class QuestionTypeService extends QuestionTypeServiceBase {
    logger = new Logger('QuestionTypeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(QuestionTypeRepository) protected questionTypeRepository: QuestionTypeRepository) {
        super(request, questionTypeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionTypeRepository.count(options);
    }
}
