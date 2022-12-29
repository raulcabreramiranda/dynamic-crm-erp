import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminPermission from './_base/admin-permission.entity';
import { AdminPermissionRepository } from './admin-permission.repository';
import { AdminPermissionService as AdminPermissionServiceBase } from './_base/admin-permission.service';

const relationshipNames = [];
relationshipNames.push('adminPermissionProfiles');
relationshipNames.push('adminPermissionUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminPermissionService extends AdminPermissionServiceBase {
    logger = new Logger('AdminPermissionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('ADMINPERMISSION_REPOSITORY') protected adminPermissionRepository: Repository<AdminPermission>) {
        super(request, adminPermissionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminPermissionRepository.count(options);
    }
}
