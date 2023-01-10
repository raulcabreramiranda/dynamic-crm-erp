import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminWhiteLabel from './_base/admin-white-label.entity';
import { AdminWhiteLabelService as AdminWhiteLabelServiceBase } from './_base/admin-white-label.service';

const relationshipNames = [];
relationshipNames.push('adminUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminWhiteLabelService extends AdminWhiteLabelServiceBase {
    logger = new Logger('AdminWhiteLabelService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('ADMINWHITELABEL_REPOSITORY') protected adminWhiteLabelRepository: Repository<AdminWhiteLabel>) {
        super(request, adminWhiteLabelRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminWhiteLabelRepository.count(options);
    }
}
