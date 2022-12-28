import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Skill from './_base/skill.entity';
import { SkillRepository } from './skill.repository';
import { SkillService as SkillServiceBase } from './_base/skill.service';

const relationshipNames = [];
relationshipNames.push('matrix');
relationshipNames.push('skillItems');

@Injectable({ scope: Scope.REQUEST })
export class SkillService extends SkillServiceBase {
    logger = new Logger('SkillService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(SkillRepository) protected skillRepository: SkillRepository) {
        super(request, skillRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.skillRepository.count(options);
    }
}
