import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import MasterTeacher from './_base/master-teacher.entity';
import { MasterTeacherRepository } from './master-teacher.repository';
import { MasterTeacherService as MasterTeacherServiceBase } from './_base/master-teacher.service';

const relationshipNames = [];
relationshipNames.push('teacher');
relationshipNames.push('discipline');
relationshipNames.push('examsMasterKnowledgeArea');

@Injectable({ scope: Scope.REQUEST })
export class MasterTeacherService extends MasterTeacherServiceBase {
    logger = new Logger('MasterTeacherService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(MasterTeacherRepository) protected masterTeacherRepository: MasterTeacherRepository) {
        super(request, masterTeacherRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.masterTeacherRepository.count(options);
    }
}
