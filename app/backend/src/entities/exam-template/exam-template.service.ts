import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamTemplate from './_base/exam-template.entity';
import { ExamTemplateRepository } from './exam-template.repository';
import { ExamTemplateService as ExamTemplateServiceBase } from './_base/exam-template.service';

const relationshipNames = [];
relationshipNames.push('studentQuestion');
relationshipNames.push('conteudoLevel2');
relationshipNames.push('subConteudoLevel3');
relationshipNames.push('itemLevel4');
relationshipNames.push('exam');
relationshipNames.push('bankQuestion');
relationshipNames.push('discipline');

@Injectable({ scope: Scope.REQUEST })
export class ExamTemplateService extends ExamTemplateServiceBase {
    logger = new Logger('ExamTemplateService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamTemplateRepository) protected examTemplateRepository: ExamTemplateRepository) {
        super(request, examTemplateRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examTemplateRepository.count(options);
    }
}
