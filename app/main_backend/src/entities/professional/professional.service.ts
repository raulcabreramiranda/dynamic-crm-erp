import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Professional from './_base/professional.entity';
import { ProfessionalService as ProfessionalServiceBase } from './_base/professional.service';
import { IProfessionalRepository } from './professional.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class ProfessionalService extends ProfessionalServiceBase {
    logger = new Logger('ProfessionalService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('PROFESSIONAL_REPOSITORY') protected professionalRepository: IProfessionalRepository) {
        super(request, professionalRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.professionalRepository.count(options);
    }
}
