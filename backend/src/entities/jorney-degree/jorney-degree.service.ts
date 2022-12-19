import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import JorneyDegree from './_base/jorney-degree.entity';
import { JorneyDegreeRepository } from './jorney-degree.repository';
import { JorneyDegreeService as JorneyDegreeServiceBase } from './_base/jorney-degree.service';

const relationshipNames = [];
relationshipNames.push('essayPreUploads');
relationshipNames.push('jorneyGalerys');
relationshipNames.push('essays');
relationshipNames.push('jorney');
relationshipNames.push('cerneDegree');
relationshipNames.push('jorneyDegreesThemes');
relationshipNames.push('configureApplications');
relationshipNames.push('configureCorrection');

@Injectable({ scope: Scope.REQUEST })
export class JorneyDegreeService extends JorneyDegreeServiceBase {
    logger = new Logger('JorneyDegreeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(JorneyDegreeRepository) protected jorneyDegreeRepository: JorneyDegreeRepository) {
        super(request, jorneyDegreeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyDegreeRepository.count(options);
    }
}
