import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Master from './_base/master.entity';
import { MasterRepository } from './master.repository';
import { MasterService as MasterServiceBase } from './_base/master.service';

const relationshipNames = [];
relationshipNames.push('examsMaster');

@Injectable({ scope: Scope.REQUEST })
export class MasterService extends MasterServiceBase {
    logger = new Logger('MasterService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(MasterRepository) protected masterRepository: MasterRepository) {
        super(request, masterRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.masterRepository.count(options);
    }
}
