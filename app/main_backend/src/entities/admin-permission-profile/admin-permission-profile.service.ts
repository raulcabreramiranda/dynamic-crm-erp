import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminPermissionProfile from './_base/admin-permission-profile.entity';
import { AdminPermissionProfileRepository } from './admin-permission-profile.repository';
import { AdminPermissionProfileService as AdminPermissionProfileServiceBase } from './_base/admin-permission-profile.service';

const relationshipNames = [];
relationshipNames.push('adminPermission');
relationshipNames.push('adminProfile');

@Injectable({ scope: Scope.REQUEST })
export class AdminPermissionProfileService extends AdminPermissionProfileServiceBase {
    logger = new Logger('AdminPermissionProfileService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('ADMINPERMISSIONPROFILE_REPOSITORY') protected adminPermissionProfileRepository: Repository<AdminPermissionProfile>) {
        super(request, adminPermissionProfileRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminPermissionProfileRepository.count(options);
    }
}
