import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminUserSuperPro from './_base/admin-user-super-pro.entity';
import { AdminUserSuperProRepository } from './admin-user-super-pro.repository';
import { AdminUserSuperProService as AdminUserSuperProServiceBase } from './_base/admin-user-super-pro.service';

const relationshipNames = [];
relationshipNames.push('theacher');

@Injectable({ scope: Scope.REQUEST })
export class AdminUserSuperProService extends AdminUserSuperProServiceBase {
    logger = new Logger('AdminUserSuperProService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminUserSuperProRepository) protected adminUserSuperProRepository: AdminUserSuperProRepository) {
        super(request, adminUserSuperProRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminUserSuperProRepository.count(options);
    }
}
