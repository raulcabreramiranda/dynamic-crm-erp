import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Theme from './_base/theme.entity';
import { ThemeRepository } from './theme.repository';
import { ThemeService as ThemeServiceBase } from './_base/theme.service';

const relationshipNames = [];
relationshipNames.push('essayPreUploads');
relationshipNames.push('configureApplications');
relationshipNames.push('configureCorrections');
relationshipNames.push('jorneyDegreesThemes');
relationshipNames.push('cerneDegree');
relationshipNames.push('jorney');
relationshipNames.push('themePdf');

@Injectable({ scope: Scope.REQUEST })
export class ThemeService extends ThemeServiceBase {
    logger = new Logger('ThemeService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ThemeRepository) protected themeRepository: ThemeRepository) {
        super(request, themeRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.themeRepository.count(options);
    }
}
