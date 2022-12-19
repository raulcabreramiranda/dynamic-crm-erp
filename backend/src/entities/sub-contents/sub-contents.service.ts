import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import SubContents from './_base/sub-contents.entity';
import { SubContentsRepository } from './sub-contents.repository';
import { SubContentsService as SubContentsServiceBase } from './_base/sub-contents.service';

const relationshipNames = [];
relationshipNames.push('content');

@Injectable({ scope: Scope.REQUEST })
export class SubContentsService extends SubContentsServiceBase {
    logger = new Logger('SubContentsService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(SubContentsRepository) protected subContentsRepository: SubContentsRepository) {
        super(request, subContentsRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.subContentsRepository.count(options);
    }
}
