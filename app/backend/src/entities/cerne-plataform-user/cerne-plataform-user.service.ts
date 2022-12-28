import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CernePlataformUser from './_base/cerne-plataform-user.entity';
import { CernePlataformUserRepository } from './cerne-plataform-user.repository';
import { CernePlataformUserService as CernePlataformUserServiceBase } from './_base/cerne-plataform-user.service';

const relationshipNames = [];
relationshipNames.push('user');
relationshipNames.push('plataform');
relationshipNames.push('class');
relationshipNames.push('degree');
relationshipNames.push('discipline');

@Injectable({ scope: Scope.REQUEST })
export class CernePlataformUserService extends CernePlataformUserServiceBase {
    logger = new Logger('CernePlataformUserService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CernePlataformUserRepository) protected cernePlataformUserRepository: CernePlataformUserRepository) {
        super(request, cernePlataformUserRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.cernePlataformUserRepository.count(options);
    }
}
