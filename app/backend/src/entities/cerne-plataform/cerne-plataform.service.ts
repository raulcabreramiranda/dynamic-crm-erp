import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CernePlataform from './_base/cerne-plataform.entity';
import { CernePlataformRepository } from './cerne-plataform.repository';
import { CernePlataformService as CernePlataformServiceBase } from './_base/cerne-plataform.service';

const relationshipNames = [];
relationshipNames.push('cernePlataformUser');

@Injectable({ scope: Scope.REQUEST })
export class CernePlataformService extends CernePlataformServiceBase {
    logger = new Logger('CernePlataformService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CernePlataformRepository) protected cernePlataformRepository: CernePlataformRepository) {
        super(request, cernePlataformRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.cernePlataformRepository.count(options);
    }
}
