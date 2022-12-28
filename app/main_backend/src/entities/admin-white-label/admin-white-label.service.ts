import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminWhiteLabel from './_base/admin-white-label.entity';
import { AdminWhiteLabelRepository } from './admin-white-label.repository';
import { AdminWhiteLabelService as AdminWhiteLabelServiceBase } from './_base/admin-white-label.service';

const relationshipNames = [];
relationshipNames.push('adminUsers');

@Injectable({ scope: Scope.REQUEST })
export class AdminWhiteLabelService extends AdminWhiteLabelServiceBase {
    logger = new Logger('AdminWhiteLabelService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminWhiteLabelRepository) protected adminWhiteLabelRepository: AdminWhiteLabelRepository) {
        super(request, adminWhiteLabelRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminWhiteLabelRepository.count(options);
    }
}
