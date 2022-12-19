import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import EssayResultComment from './_base/essay-result-comment.entity';
import { EssayResultCommentRepository } from './essay-result-comment.repository';
import { EssayResultCommentService as EssayResultCommentServiceBase } from './_base/essay-result-comment.service';

const relationshipNames = [];
relationshipNames.push('essayResult');

@Injectable({ scope: Scope.REQUEST })
export class EssayResultCommentService extends EssayResultCommentServiceBase {
    logger = new Logger('EssayResultCommentService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(EssayResultCommentRepository) protected essayResultCommentRepository: EssayResultCommentRepository) {
        super(request, essayResultCommentRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.essayResultCommentRepository.count(options);
    }
}
