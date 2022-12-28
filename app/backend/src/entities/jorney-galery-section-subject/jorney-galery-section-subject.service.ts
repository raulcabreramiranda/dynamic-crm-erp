import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import JorneyGalerySectionSubject from './_base/jorney-galery-section-subject.entity';
import { JorneyGalerySectionSubjectRepository } from './jorney-galery-section-subject.repository';
import { JorneyGalerySectionSubjectService as JorneyGalerySectionSubjectServiceBase } from './_base/jorney-galery-section-subject.service';

const relationshipNames = [];
relationshipNames.push('jorneyGalerySections');

@Injectable({ scope: Scope.REQUEST })
export class JorneyGalerySectionSubjectService extends JorneyGalerySectionSubjectServiceBase {
    logger = new Logger('JorneyGalerySectionSubjectService');

    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        @InjectRepository(JorneyGalerySectionSubjectRepository) protected jorneyGalerySectionSubjectRepository: JorneyGalerySectionSubjectRepository,
    ) {
        super(request, jorneyGalerySectionSubjectRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyGalerySectionSubjectRepository.count(options);
    }
}
