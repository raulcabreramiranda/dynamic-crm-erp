/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { PatientSex } from '../../../entities/patient/_base/patient-sex.enum';
import { PatientLiminar } from '../../../entities/patient/_base/patient-liminar.enum';
import { PatientStatus } from '../../../entities/patient/_base/patient-status.enum';
import { PatientAdId } from '../../../entities/patient/_base/patient-ad-id.enum';
import { PatientPatientComplexity } from '../../../entities/patient/_base/patient-patient-complexity.enum';
import { PatientObese } from '../../../entities/patient/_base/patient-obese.enum';

/**
 * A Patient DTO object.
 */
export class PatientDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'cpf field', required: false })
    cpf: string;

    @ApiProperty({ description: 'rg field', required: false })
    rg: string;

    @ApiProperty({ enum: PatientSex, description: 'sex enum field', required: false })
    sex: PatientSex;

    @ApiProperty({ description: 'birthDate field', required: false })
    birthDate: Date;

    @ApiProperty({ description: 'weight field', required: false })
    weight: number;

    @ApiProperty({ description: 'height field', required: false })
    height: number;

    @ApiProperty({ description: 'healthPlanEnrollment field', required: false })
    healthPlanEnrollment: string;

    @ApiProperty({ enum: PatientLiminar, description: 'liminar enum field', required: false })
    liminar: PatientLiminar;

    @ApiProperty({ description: 'observations field', required: false })
    observations: string;

    @ApiProperty({ description: 'informationProfessional field', required: false })
    informationProfessional: string;

    @ApiProperty({ description: 'register field', required: false })
    register: boolean;

    @ApiProperty({ description: 'zipCode field', required: false })
    zipCode: string;

    @ApiProperty({ description: 'hospitalReference field', required: false })
    hospitalReference: string;

    @ApiProperty({ description: 'street field', required: false })
    street: string;

    @ApiProperty({ description: 'complement field', required: false })
    complement: string;

    @ApiProperty({ description: 'number field', required: false })
    number: string;

    @ApiProperty({ description: 'neighborhood field', required: false })
    neighborhood: string;

    @ApiProperty({ description: 'city field', required: false })
    city: string;

    @ApiProperty({ description: 'uf field', required: false })
    uf: string;

    @ApiProperty({ description: 'reference field', required: false })
    reference: string;

    @ApiProperty({ description: 'lat field', required: false })
    lat: number;

    @ApiProperty({ description: 'lng field', required: false })
    lng: number;

    @ApiProperty({ enum: PatientStatus, description: 'status enum field', required: false })
    status: PatientStatus;

    @ApiProperty({ enum: PatientAdId, description: 'adId enum field', required: false })
    adId: PatientAdId;

    @ApiProperty({ description: 'nead field', required: false })
    nead: number;

    @ApiProperty({ enum: PatientPatientComplexity, description: 'patientComplexity enum field', required: false })
    patientComplexity: PatientPatientComplexity;

    @ApiProperty({ enum: PatientObese, description: 'obese enum field', required: false })
    obese: PatientObese;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
