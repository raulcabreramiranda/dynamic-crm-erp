import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import JorneyGalery from './_base/jorney-galery.entity';
import { JorneyGaleryRepository } from './jorney-galery.repository';
import { JorneyGaleryService as JorneyGaleryServiceBase } from './_base/jorney-galery.service';

const relationshipNames = [];
relationshipNames.push('jorneyDegrees');
relationshipNames.push('jorneyGalerySections');

@Injectable({ scope: Scope.REQUEST })
export class JorneyGaleryService extends JorneyGaleryServiceBase {
    logger = new Logger('JorneyGaleryService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(JorneyGaleryRepository) protected jorneyGaleryRepository: JorneyGaleryRepository) {
        super(request, jorneyGaleryRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyGaleryRepository.count(options);
    }
}
