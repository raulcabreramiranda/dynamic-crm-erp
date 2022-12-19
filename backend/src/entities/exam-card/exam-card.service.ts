import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ExamCard from './_base/exam-card.entity';
import { ExamCardRepository } from './exam-card.repository';
import { ExamCardService as ExamCardServiceBase } from './_base/exam-card.service';

const relationshipNames = [];
relationshipNames.push('examCardRead');

@Injectable({ scope: Scope.REQUEST })
export class ExamCardService extends ExamCardServiceBase {
    logger = new Logger('ExamCardService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ExamCardRepository) protected examCardRepository: ExamCardRepository) {
        super(request, examCardRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.examCardRepository.count(options);
    }
}
