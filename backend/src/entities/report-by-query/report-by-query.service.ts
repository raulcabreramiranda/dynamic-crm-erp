import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ReportByQuery from './_base/report-by-query.entity';
import { ReportByQueryRepository } from './report-by-query.repository';
import { ReportByQueryService as ReportByQueryServiceBase } from './_base/report-by-query.service';

const relationshipNames = [];
relationshipNames.push('reportSubquery');
relationshipNames.push('reportCategory');

@Injectable({ scope: Scope.REQUEST })
export class ReportByQueryService extends ReportByQueryServiceBase {
    logger = new Logger('ReportByQueryService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ReportByQueryRepository) protected reportByQueryRepository: ReportByQueryRepository) {
        super(request, reportByQueryRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.reportByQueryRepository.count(options);
    }
}
