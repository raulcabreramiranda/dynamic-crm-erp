import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamConfigureApplication from './_base/exam-configure-application.entity';
import { ExamConfigureApplicationRepository } from './exam-configure-application.repository';
import { ExamConfigureApplicationService as ExamConfigureApplicationServiceBase } from './_base/exam-configure-application.service';

const relationshipNames = [];
relationshipNames.push('exam');
relationshipNames.push('cerneClass');

@Injectable({ scope: Scope.REQUEST })
export class ExamConfigureApplicationService extends ExamConfigureApplicationServiceBase {
    logger = new Logger('ExamConfigureApplicationService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(ExamConfigureApplicationRepository) protected examConfigureApplicationRepository: ExamConfigureApplicationRepository,
    ) {
        super(request, examConfigureApplicationRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examConfigureApplicationRepository.count(options);
    }
}
