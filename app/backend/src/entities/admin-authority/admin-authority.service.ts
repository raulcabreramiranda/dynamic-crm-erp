import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminAuthority from './_base/admin-authority.entity';
import { AdminAuthorityRepository } from './admin-authority.repository';
import { AdminAuthorityService as AdminAuthorityServiceBase } from './_base/admin-authority.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class AdminAuthorityService extends AdminAuthorityServiceBase {
    logger = new Logger('AdminAuthorityService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminAuthorityRepository) protected adminAuthorityRepository: AdminAuthorityRepository) {
        super(request, adminAuthorityRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminAuthorityRepository.count(options);
    }
}