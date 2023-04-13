import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Company from './_base/company.entity';
import { CompanyService as CompanyServiceBase } from './_base/company.service';
import { ICompanyRepository } from './company.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class CompanyService extends CompanyServiceBase {
    logger = new Logger('CompanyService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('COMPANY_REPOSITORY') protected companyRepository: ICompanyRepository) {
        super(request, companyRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.companyRepository.count(options);
    }
}
