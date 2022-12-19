import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CerneClass from './_base/cerne-class.entity';
import { CerneClassRepository } from './cerne-class.repository';
import { CerneClassService as CerneClassServiceBase } from './_base/cerne-class.service';

const relationshipNames = [];
relationshipNames.push('examConfigureApplication');
relationshipNames.push('cernePlataformUser');
relationshipNames.push('essays');
relationshipNames.push('adminUsers');
relationshipNames.push('configureApplications');
relationshipNames.push('configureCorrections');
relationshipNames.push('cerneDegrees');

@Injectable({ scope: Scope.REQUEST })
export class CerneClassService extends CerneClassServiceBase {
    logger = new Logger('CerneClassService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CerneClassRepository) protected cerneClassRepository: CerneClassRepository) {
        super(request, cerneClassRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.cerneClassRepository.count(options);
    }
}
