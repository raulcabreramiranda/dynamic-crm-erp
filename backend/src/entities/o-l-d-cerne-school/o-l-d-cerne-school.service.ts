import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import OLDCerneSchool from './_base/o-l-d-cerne-school.entity';
import { OLDCerneSchoolRepository } from './o-l-d-cerne-school.repository';
import { OLDCerneSchoolService as OLDCerneSchoolServiceBase } from './_base/o-l-d-cerne-school.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class OLDCerneSchoolService extends OLDCerneSchoolServiceBase {
    logger = new Logger('OLDCerneSchoolService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(OLDCerneSchoolRepository) protected oLDCerneSchoolRepository: OLDCerneSchoolRepository) {
        super(request, oLDCerneSchoolRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.oLDCerneSchoolRepository.count(options);
    }
}
