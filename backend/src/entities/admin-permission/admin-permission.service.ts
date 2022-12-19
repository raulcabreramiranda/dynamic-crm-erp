import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminPermission from './_base/admin-permission.entity';
import { AdminPermissionRepository } from './admin-permission.repository';
import { AdminPermissionService as AdminPermissionServiceBase } from './_base/admin-permission.service';

const relationshipNames = [];
relationshipNames.push('adminPermissionProfiles');
relationshipNames.push('adminPermissionUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminPermissionService extends AdminPermissionServiceBase {
    logger = new Logger('AdminPermissionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminPermissionRepository) protected adminPermissionRepository: AdminPermissionRepository) {
        super(request, adminPermissionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminPermissionRepository.count(options);
    }
}
