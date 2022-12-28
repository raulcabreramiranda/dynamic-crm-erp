import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminPermissionUser from './_base/admin-permission-user.entity';
import { AdminPermissionUserRepository } from './admin-permission-user.repository';
import { AdminPermissionUserService as AdminPermissionUserServiceBase } from './_base/admin-permission-user.service';

const relationshipNames = [];
relationshipNames.push('adminPermission');
relationshipNames.push('adminUser');

@Injectable({ scope: Scope.REQUEST })
export class AdminPermissionUserService extends AdminPermissionUserServiceBase {
    logger = new Logger('AdminPermissionUserService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminPermissionUserRepository) protected adminPermissionUserRepository: AdminPermissionUserRepository) {
        super(request, adminPermissionUserRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminPermissionUserRepository.count(options);
    }
}
