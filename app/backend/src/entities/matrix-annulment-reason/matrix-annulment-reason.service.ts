import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import MatrixAnnulmentReason from './_base/matrix-annulment-reason.entity';
import { MatrixAnnulmentReasonRepository } from './matrix-annulment-reason.repository';
import { MatrixAnnulmentReasonService as MatrixAnnulmentReasonServiceBase } from './_base/matrix-annulment-reason.service';

const relationshipNames = [];
relationshipNames.push('essayResult');
relationshipNames.push('matrix');

@Injectable({ scope: Scope.REQUEST })
export class MatrixAnnulmentReasonService extends MatrixAnnulmentReasonServiceBase {
    logger = new Logger('MatrixAnnulmentReasonService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(MatrixAnnulmentReasonRepository) protected matrixAnnulmentReasonRepository: MatrixAnnulmentReasonRepository) {
        super(request, matrixAnnulmentReasonRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.matrixAnnulmentReasonRepository.count(options);
    }
}
