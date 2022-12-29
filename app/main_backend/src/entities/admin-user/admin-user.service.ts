import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminUser from './_base/admin-user.entity';
import { AdminUserRepository } from './admin-user.repository';
import { AdminUserService as AdminUserServiceBase } from './_base/admin-user.service';

const relationshipNames = [];
relationshipNames.push('adminProfile');
relationshipNames.push('adminPermissionUsers');
relationshipNames.push('adminWhiteLabel');

@Injectable({ scope: Scope.REQUEST })
export class AdminUserService extends AdminUserServiceBase {
    logger = new Logger('AdminUserService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('ADMINUSER_REPOSITORY') protected adminUserRepository: Repository<AdminUser>) {
        super(request, adminUserRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminUserRepository.count(options);
    }
}
