import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import EssayPreUpload from './_base/essay-pre-upload.entity';
import { EssayPreUploadRepository } from './essay-pre-upload.repository';
import { EssayPreUploadService as EssayPreUploadServiceBase } from './_base/essay-pre-upload.service';

const relationshipNames = [];
relationshipNames.push('jorneyDegree');
relationshipNames.push('theme');
relationshipNames.push('essay');

@Injectable({ scope: Scope.REQUEST })
export class EssayPreUploadService extends EssayPreUploadServiceBase {
    logger = new Logger('EssayPreUploadService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(EssayPreUploadRepository) protected essayPreUploadRepository: EssayPreUploadRepository) {
        super(request, essayPreUploadRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.essayPreUploadRepository.count(options);
    }
}
