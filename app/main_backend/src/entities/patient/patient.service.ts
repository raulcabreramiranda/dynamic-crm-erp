import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Repository, FindManyOptions, FindOneOptions, Like, Equal, IsNull, Not, MoreThan, LessThan, In, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm';
import Patient from './_base/patient.entity';
import { PatientService as PatientServiceBase } from './_base/patient.service';
import { IPatientRepository } from './patient.providers';

const relationshipNames = [];

@Injectable({ scope: Scope.REQUEST })
export class PatientService extends PatientServiceBase {
    logger = new Logger('PatientService');

    constructor(@Inject(REQUEST) protected readonly request: Request, @Inject('PATIENT_REPOSITORY') protected patientRepository: IPatientRepository) {
        super(request, patientRepository);
    }

    async countEntityTest(): Promise<number> {
        const options = {};
        return await this.patientRepository.count(options);
    }
}
