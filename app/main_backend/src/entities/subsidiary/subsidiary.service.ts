import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Subsidiary from './_base/subsidiary.entity';
import { SubsidiaryService as SubsidiaryServiceBase } from './_base/subsidiary.service';
import { ISubsidiaryRepository } from './subsidiary.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class SubsidiaryService extends SubsidiaryServiceBase {
    logger = new Logger('SubsidiaryService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('SUBSIDIARY_REPOSITORY') protected subsidiaryRepository: ISubsidiaryRepository) {
        super(request, subsidiaryRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.subsidiaryRepository.count(options);
    }
}
