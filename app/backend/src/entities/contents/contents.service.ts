import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Contents from './_base/contents.entity';
import { ContentsRepository } from './contents.repository';
import { ContentsService as ContentsServiceBase } from './_base/contents.service';

const relationshipNames = [];
relationshipNames.push('subContents');
relationshipNames.push('discipline');
relationshipNames.push('series');

@Injectable({ scope: Scope.REQUEST })
export class ContentsService extends ContentsServiceBase {
    logger = new Logger('ContentsService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ContentsRepository) protected contentsRepository: ContentsRepository) {
        super(request, contentsRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.contentsRepository.count(options);
    }
}
