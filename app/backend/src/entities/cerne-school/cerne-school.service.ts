import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CerneSchool from './_base/cerne-school.entity';
import { CerneSchoolRepository } from './cerne-school.repository';
import { CerneSchoolService as CerneSchoolServiceBase } from './_base/cerne-school.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class CerneSchoolService extends CerneSchoolServiceBase {
    logger = new Logger('CerneSchoolService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CerneSchoolRepository) protected cerneSchoolRepository: CerneSchoolRepository) {
        super(request, cerneSchoolRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.cerneSchoolRepository.count(options);
    }
}
