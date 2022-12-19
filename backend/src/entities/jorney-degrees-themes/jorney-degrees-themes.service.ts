import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import JorneyDegreesThemes from './_base/jorney-degrees-themes.entity';
import { JorneyDegreesThemesRepository } from './jorney-degrees-themes.repository';
import { JorneyDegreesThemesService as JorneyDegreesThemesServiceBase } from './_base/jorney-degrees-themes.service';

const relationshipNames = [];
relationshipNames.push('jorneyDegree');
relationshipNames.push('theme');

@Injectable({ scope: Scope.REQUEST })
export class JorneyDegreesThemesService extends JorneyDegreesThemesServiceBase {
    logger = new Logger('JorneyDegreesThemesService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(JorneyDegreesThemesRepository) protected jorneyDegreesThemesRepository: JorneyDegreesThemesRepository) {
        super(request, jorneyDegreesThemesRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.jorneyDegreesThemesRepository.count(options);
    }
}
