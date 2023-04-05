import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import BusinessEntityField from './_base/business-entity-field.entity';
import { BusinessEntityFieldService as BusinessEntityFieldServiceBase } from './_base/business-entity-field.service';
import { IBusinessEntityFieldRepository } from './business-entity-field.providers';

const relationshipNames = [];
relationshipNames.push('businessEntity');

@Injectable({ scope: Scope.REQUEST })
export class BusinessEntityFieldService extends BusinessEntityFieldServiceBase {
    logger = new Logger('BusinessEntityFieldService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('BUSINESSENTITYFIELD_REPOSITORY') protected businessEntityFieldRepository: IBusinessEntityFieldRepository) {
        super(request, businessEntityFieldRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.businessEntityFieldRepository.count(options);
    }
}
