import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ReportSubquery from './_base/report-subquery.entity';
import { ReportSubqueryRepository } from './report-subquery.repository';
import { ReportSubqueryService as ReportSubqueryServiceBase } from './_base/report-subquery.service';

const relationshipNames = [];
relationshipNames.push('reportByQuery');
relationshipNames.push('reportQueryTemplate');
relationshipNames.push('reportCategory');

@Injectable({ scope: Scope.REQUEST })
export class ReportSubqueryService extends ReportSubqueryServiceBase {
    logger = new Logger('ReportSubqueryService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ReportSubqueryRepository) protected reportSubqueryRepository: ReportSubqueryRepository) {
        super(request, reportSubqueryRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.reportSubqueryRepository.count(options);
    }
}
