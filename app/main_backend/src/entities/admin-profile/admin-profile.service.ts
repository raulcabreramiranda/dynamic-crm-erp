import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminProfile from './_base/admin-profile.entity';
import { AdminProfileRepository } from './admin-profile.repository';
import { AdminProfileService as AdminProfileServiceBase } from './_base/admin-profile.service';
import { AdminPermissionProfileRepository } from '../admin-permission-profile/admin-permission-profile.repository';

const relationshipNames = [];
relationshipNames.push('adminPermissionProfiles');
relationshipNames.push('adminUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminProfileService extends AdminProfileServiceBase {
    logger = new Logger('AdminProfileService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminProfileRepository) protected adminProfileRepository: AdminProfileRepository, @InjectRepository(AdminPermissionProfileRepository) protected adminPermissionProfileRepository: AdminPermissionProfileRepository,) {
        super(request, adminProfileRepository, adminPermissionProfileRepository);
        
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminProfileRepository.count(options);
    }
}
