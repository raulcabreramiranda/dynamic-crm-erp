import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import SkillItem from './_base/skill-item.entity';
import { SkillItemRepository } from './skill-item.repository';
import { SkillItemService as SkillItemServiceBase } from './_base/skill-item.service';

const relationshipNames = [];
relationshipNames.push('skill');
relationshipNames.push('essayResults');
relationshipNames.push('essayResultsFinal');

@Injectable({ scope: Scope.REQUEST })
export class SkillItemService extends SkillItemServiceBase {
    logger = new Logger('SkillItemService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(SkillItemRepository) protected skillItemRepository: SkillItemRepository) {
        super(request, skillItemRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.skillItemRepository.count(options);
    }
}
