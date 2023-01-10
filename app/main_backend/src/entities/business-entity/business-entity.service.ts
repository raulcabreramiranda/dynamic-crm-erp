import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import BusinessEntity from './_base/business-entity.entity';
import { BusinessEntityService as BusinessEntityServiceBase } from './_base/business-entity.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class BusinessEntityService extends BusinessEntityServiceBase {
    logger = new Logger('BusinessEntityService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('BUSINESSENTITY_REPOSITORY') protected businessEntityRepository: Repository<BusinessEntity>) {
        super(request, businessEntityRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.businessEntityRepository.count(options);
    }
}
