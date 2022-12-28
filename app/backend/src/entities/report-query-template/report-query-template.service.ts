import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ReportQueryTemplate from './_base/report-query-template.entity';
import { ReportQueryTemplateRepository } from './report-query-template.repository';
import { ReportQueryTemplateService as ReportQueryTemplateServiceBase } from './_base/report-query-template.service';

const relationshipNames = [];
relationshipNames.push('reportSubquery');

@Injectable({ scope: Scope.REQUEST })
export class ReportQueryTemplateService extends ReportQueryTemplateServiceBase {
    logger = new Logger('ReportQueryTemplateService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ReportQueryTemplateRepository) protected reportQueryTemplateRepository: ReportQueryTemplateRepository) {
        super(request, reportQueryTemplateRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.reportQueryTemplateRepository.count(options);
    }
}
