import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import JorneyGalerySection from './_base/jorney-galery-section.entity';
import { JorneyGalerySectionRepository } from './jorney-galery-section.repository';
import { JorneyGalerySectionService as JorneyGalerySectionServiceBase } from './_base/jorney-galery-section.service';

const relationshipNames = [];
relationshipNames.push('jorneyGalery');
relationshipNames.push('jorneyGalerySectionSubjects');

@Injectable({ scope: Scope.REQUEST })
export class JorneyGalerySectionService extends JorneyGalerySectionServiceBase {
    logger = new Logger('JorneyGalerySectionService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(JorneyGalerySectionRepository) protected jorneyGalerySectionRepository: JorneyGalerySectionRepository) {
        super(request, jorneyGalerySectionRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyGalerySectionRepository.count(options);
    }
}
