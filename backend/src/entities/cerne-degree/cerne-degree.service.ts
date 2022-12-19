import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import CerneDegree from './_base/cerne-degree.entity';
import { CerneDegreeRepository } from './cerne-degree.repository';
import { CerneDegreeService as CerneDegreeServiceBase } from './_base/cerne-degree.service';

const relationshipNames = [];
relationshipNames.push('contents');
relationshipNames.push('exam');
relationshipNames.push('cernePlataformUser');
relationshipNames.push('jorneyDegrees');
relationshipNames.push('cerneClasses');
relationshipNames.push('themes');

@Injectable({ scope: Scope.REQUEST })
export class CerneDegreeService extends CerneDegreeServiceBase {
    logger = new Logger('CerneDegreeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(CerneDegreeRepository) protected cerneDegreeRepository: CerneDegreeRepository) {
        super(request, cerneDegreeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.cerneDegreeRepository.count(options);
    }
}
