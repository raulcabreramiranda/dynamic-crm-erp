import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminUser from './_base/admin-user.entity';
import { AdminUserRepository } from './admin-user.repository';
import { AdminUserService as AdminUserServiceBase } from './_base/admin-user.service';

const relationshipNames = [];
relationshipNames.push('studentQuestion');
relationshipNames.push('studentExam');
relationshipNames.push('examCardRead');
relationshipNames.push('masterTeacher');
relationshipNames.push('cernePlataformUser');
relationshipNames.push('adminProfile');
relationshipNames.push('adminUserSuperPro');
relationshipNames.push('adminPermissionUsers');
relationshipNames.push('adminWhiteLabel');
relationshipNames.push('cerneClass');
relationshipNames.push('essays');
relationshipNames.push('essayResults');
relationshipNames.push('configureCorrectionReviewers');
relationshipNames.push('reviewEssays');

@Injectable({ scope: Scope.REQUEST })
export class AdminUserService extends AdminUserServiceBase {
    logger = new Logger('AdminUserService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminUserRepository) protected adminUserRepository: AdminUserRepository) {
        super(request, adminUserRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminUserRepository.count(options);
    }
}
