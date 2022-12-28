import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import AdminAuditEntity from './_base/admin-audit-entity.entity';
import { AdminAuditEntityRepository } from './admin-audit-entity.repository';
import { AdminAuditEntityService as AdminAuditEntityServiceBase } from './_base/admin-audit-entity.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class AdminAuditEntityService extends AdminAuditEntityServiceBase {
    logger = new Logger('AdminAuditEntityService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(AdminAuditEntityRepository) protected adminAuditEntityRepository: AdminAuditEntityRepository) {
        super(request, adminAuditEntityRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.adminAuditEntityRepository.count(options);
    }
}
