/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { PatientSex } from './patient-sex.enum';
import { PatientLiminar } from './patient-liminar.enum';
import { PatientStatus } from './patient-status.enum';
import { PatientAdId } from './patient-ad-id.enum';
import { PatientPatientComplexity } from './patient-patient-complexity.enum';
import { PatientObese } from './patient-obese.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Patient'] ?? 'Patient')
export class Patient extends BaseEntity {
    static columnsMetaData() {
        return {
            name: String,
            cpf: String,
            rg: String,
            sex: PatientSex,
            birthDate: Date,
            weight: Number,
            height: Number,
            healthPlanEnrollment: String,
            liminar: PatientLiminar,
            observations: String,
            informationProfessional: String,
            register: Boolean,
            zipCode: String,
            hospitalReference: String,
            street: String,
            complement: String,
            number: String,
            neighborhood: String,
            city: String,
            uf: String,
            reference: String,
            lat: Number,
            lng: Number,
            status: PatientStatus,
            adId: PatientAdId,
            nead: Number,
            patientComplexity: PatientPatientComplexity,
            obese: PatientObese,
        };
    }

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ name: 'cpf', nullable: true })
    @ApiProperty({ required: false })
    cpf: string;

    @Column({ name: 'rg', nullable: true })
    @ApiProperty({ required: false })
    rg: string;

    @Column({ type: 'simple-enum', name: 'sex', enum: PatientSex, nullable: true })
    @ApiProperty({ required: false })
    sex: PatientSex;

    @Column({ type: 'date', name: 'birthDate', nullable: true })
    @ApiProperty({ required: false })
    birthDate: Date;

    @Column({ type: 'decimal', name: 'weight', precision: 10, scale: 2, nullable: true })
    @ApiProperty({ required: false })
    weight: number;

    @Column({ type: 'decimal', name: 'height', precision: 10, scale: 2, nullable: true })
    @ApiProperty({ required: false })
    height: number;

    @Column({ name: 'healthPlanEnrollment', nullable: true })
    @ApiProperty({ required: false })
    healthPlanEnrollment: string;

    @Column({ type: 'simple-enum', name: 'liminar', enum: PatientLiminar, nullable: true })
    @ApiProperty({ required: false })
    liminar: PatientLiminar;

    @Column({ type: 'text', name: 'observations', nullable: true })
    @ApiProperty({ required: false })
    observations: string;

    @Column({ name: 'informationProfessional', nullable: true })
    @ApiProperty({ required: false })
    informationProfessional: string;

    @Column({ name: 'register', nullable: true })
    @ApiProperty({ required: false })
    register: boolean;

    @Column({ name: 'zipCode', nullable: true })
    @ApiProperty({ required: false })
    zipCode: string;

    @Column({ name: 'hospitalReference', nullable: true })
    @ApiProperty({ required: false })
    hospitalReference: string;

    @Column({ name: 'street', nullable: true })
    @ApiProperty({ required: false })
    street: string;

    @Column({ name: 'complement', nullable: true })
    @ApiProperty({ required: false })
    complement: string;

    @Column({ name: 'number', nullable: true })
    @ApiProperty({ required: false })
    number: string;

    @Column({ name: 'neighborhood', nullable: true })
    @ApiProperty({ required: false })
    neighborhood: string;

    @Column({ name: 'city', nullable: true })
    @ApiProperty({ required: false })
    city: string;

    @Column({ name: 'uf', nullable: true })
    @ApiProperty({ required: false })
    uf: string;

    @Column({ name: 'reference', nullable: true })
    @ApiProperty({ required: false })
    reference: string;

    @Column({ type: 'decimal', name: 'lat', precision: 10, scale: 2, nullable: true })
    @ApiProperty({ required: false })
    lat: number;

    @Column({ type: 'decimal', name: 'lng', precision: 10, scale: 2, nullable: true })
    @ApiProperty({ required: false })
    lng: number;

    @Column({ type: 'simple-enum', name: 'status', enum: PatientStatus, nullable: true })
    @ApiProperty({ required: false })
    status: PatientStatus;

    @Column({ type: 'simple-enum', name: 'adId', enum: PatientAdId, nullable: true })
    @ApiProperty({ required: false })
    adId: PatientAdId;

    @Column({ type: 'bigint', name: 'nead', nullable: true })
    @ApiProperty({ required: false })
    nead: number;

    @Column({ type: 'simple-enum', name: 'patientComplexity', enum: PatientPatientComplexity, nullable: true })
    @ApiProperty({ required: false })
    patientComplexity: PatientPatientComplexity;

    @Column({ type: 'simple-enum', name: 'obese', enum: PatientObese, nullable: true })
    @ApiProperty({ required: false })
    obese: PatientObese;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

export default Patient;
