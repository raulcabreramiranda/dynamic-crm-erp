import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Font from './_base/font.entity';
import { FontRepository } from './font.repository';
import { FontService as FontServiceBase } from './_base/font.service';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class FontService extends FontServiceBase {
    logger = new Logger('FontService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(FontRepository) protected fontRepository: FontRepository) {
        super(request, fontRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.fontRepository.count(options);
    }
}
