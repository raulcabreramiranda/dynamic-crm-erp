import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Photo from './_base/photo.entity';
import { PhotoService as PhotoServiceBase } from './_base/photo.service';
import { IPhotoRepository } from './photo.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class PhotoService extends PhotoServiceBase {
    logger = new Logger('PhotoService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('PHOTO_REPOSITORY') protected photoRepository: IPhotoRepository) {
        super(request, photoRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.photoRepository.count(options);
    }
}
