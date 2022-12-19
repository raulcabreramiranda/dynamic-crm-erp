import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ReportCategory from './_base/report-category.entity';
import { ReportCategoryRepository } from './report-category.repository';
import { ReportCategoryService as ReportCategoryServiceBase } from './_base/report-category.service';

const relationshipNames = [];
relationshipNames.push('reportSubquery');
relationshipNames.push('reportByQuery');

@Injectable({ scope: Scope.REQUEST })
export class ReportCategoryService extends ReportCategoryServiceBase {
    logger = new Logger('ReportCategoryService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ReportCategoryRepository) protected reportCategoryRepository: ReportCategoryRepository) {
        super(request, reportCategoryRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.reportCategoryRepository.count(options);
    }
}
