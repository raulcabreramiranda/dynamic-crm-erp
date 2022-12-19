import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import QuestionImportTemplate from './_base/question-import-template.entity';
import { QuestionImportTemplateRepository } from './question-import-template.repository';
import { QuestionImportTemplateService as QuestionImportTemplateServiceBase } from './_base/question-import-template.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class QuestionImportTemplateService extends QuestionImportTemplateServiceBase {
    logger = new Logger('QuestionImportTemplateService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(QuestionImportTemplateRepository) protected questionImportTemplateRepository: QuestionImportTemplateRepository,
    ) {
        super(request, questionImportTemplateRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.questionImportTemplateRepository.count(options);
    }
}
