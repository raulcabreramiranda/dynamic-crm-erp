import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ThemePdf from './_base/theme-pdf.entity';
import { ThemePdfRepository } from './theme-pdf.repository';
import { ThemePdfService as ThemePdfServiceBase } from './_base/theme-pdf.service';

const relationshipNames = [];
relationshipNames.push('theme');

@Injectable({ scope: Scope.REQUEST })
export class ThemePdfService extends ThemePdfServiceBase {
    logger = new Logger('ThemePdfService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ThemePdfRepository) protected themePdfRepository: ThemePdfRepository) {
        super(request, themePdfRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.themePdfRepository.count(options);
    }
}
