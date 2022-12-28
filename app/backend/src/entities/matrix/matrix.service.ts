import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Matrix from './_base/matrix.entity';
import { MatrixRepository } from './matrix.repository';
import { MatrixService as MatrixServiceBase } from './_base/matrix.service';

const relationshipNames = [];
relationshipNames.push('essays');
relationshipNames.push('matrixAnnulmentReasons');
relationshipNames.push('skills');

@Injectable({ scope: Scope.REQUEST })
export class MatrixService extends MatrixServiceBase {
    logger = new Logger('MatrixService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(MatrixRepository) protected matrixRepository: MatrixRepository) {
        super(request, matrixRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.matrixRepository.count(options);
    }
}
