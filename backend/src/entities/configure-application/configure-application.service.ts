import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import ConfigureApplication from './_base/configure-application.entity';
import { ConfigureApplicationRepository } from './configure-application.repository';
import { ConfigureApplicationService as ConfigureApplicationServiceBase } from './_base/configure-application.service';

const relationshipNames = [];
relationshipNames.push('theme');
relationshipNames.push('cerneClass');
relationshipNames.push('essays');
relationshipNames.push('jorneyDegree');

@Injectable({ scope: Scope.REQUEST })
export class ConfigureApplicationService extends ConfigureApplicationServiceBase {
    logger = new Logger('ConfigureApplicationService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @InjectRepository(ConfigureApplicationRepository) protected configureApplicationRepository: ConfigureApplicationRepository) {
        super(request, configureApplicationRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.configureApplicationRepository.count(options);
    }
}
