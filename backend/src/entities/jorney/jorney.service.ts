import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Jorney from './_base/jorney.entity';
import { JorneyRepository } from './jorney.repository';
import { JorneyService as JorneyServiceBase } from './_base/jorney.service';

const relationshipNames = [];
relationshipNames.push('jorneyDegrees');
relationshipNames.push('themes');

@Injectable({ scope: Scope.REQUEST })
export class JorneyService extends JorneyServiceBase {
    logger = new Logger('JorneyService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(JorneyRepository) protected jorneyRepository: JorneyRepository) {
        super(request, jorneyRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyRepository.count(options);
    }
}
