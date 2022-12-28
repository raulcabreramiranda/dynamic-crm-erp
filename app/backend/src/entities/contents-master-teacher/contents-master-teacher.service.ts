import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ContentsMasterTeacher from './_base/contents-master-teacher.entity';
import { ContentsMasterTeacherRepository } from './contents-master-teacher.repository';
import { ContentsMasterTeacherService as ContentsMasterTeacherServiceBase } from './_base/contents-master-teacher.service';

const relationshipNames = [];
relationshipNames.push('subContent');
relationshipNames.push('examsMasterKnowledgeArea');

@Injectable({ scope: Scope.REQUEST })
export class ContentsMasterTeacherService extends ContentsMasterTeacherServiceBase {
    logger = new Logger('ContentsMasterTeacherService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ContentsMasterTeacherRepository) protected contentsMasterTeacherRepository: ContentsMasterTeacherRepository) {
        super(request, contentsMasterTeacherRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.contentsMasterTeacherRepository.count(options);
    }
}
