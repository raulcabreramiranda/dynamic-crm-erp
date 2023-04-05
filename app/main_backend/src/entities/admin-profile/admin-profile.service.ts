import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminProfile from './_base/admin-profile.entity';
import { AdminProfileService as AdminProfileServiceBase } from './_base/admin-profile.service';
import { IAdminProfileRepository } from './admin-profile.providers';

const relationshipNames = [];
relationshipNames.push('adminPermissionProfiles');
relationshipNames.push('adminUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminProfileService extends AdminProfileServiceBase {
    logger = new Logger('AdminProfileService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('ADMINPROFILE_REPOSITORY') protected adminProfileRepository: IAdminProfileRepository) {
        super(request, adminProfileRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminProfileRepository.count(options);
    }
}
