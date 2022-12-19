import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import EssayExternalReview from './_base/essay-external-review.entity';
import { EssayExternalReviewRepository } from './essay-external-review.repository';
import { EssayExternalReviewService as EssayExternalReviewServiceBase } from './_base/essay-external-review.service';

const relationshipNames = [];
relationshipNames.push('essay');

@Injectable({ scope: Scope.REQUEST })
export class EssayExternalReviewService extends EssayExternalReviewServiceBase {
    logger = new Logger('EssayExternalReviewService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(EssayExternalReviewRepository) protected essayExternalReviewRepository: EssayExternalReviewRepository) {
        super(request, essayExternalReviewRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.essayExternalReviewRepository.count(options);
    }
}
