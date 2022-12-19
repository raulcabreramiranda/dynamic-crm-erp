/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { SystemEvaluation } from './system-evaluation.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['CerneSchool'] ?? 'CerneSchool')
export class CerneSchool extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            systemEvaluation: SystemEvaluation,
            deliveryProof: Number,
            printingProof: Number,
            uploadReplyCard: Number,
            date: Date,
            image: String,
            imageContentType: String,
            correctionEssayQuestions: Number,
            releaseResults: Number,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'simple-enum', name: 'systemEvaluation', enum: SystemEvaluation, nullable: true })
    @ApiProperty({ required: false })
    systemEvaluation: SystemEvaluation;

    @Column({ type: 'integer', name: 'deliveryProof', nullable: true })
    @ApiProperty({ required: false })
    deliveryProof: number;

    @Column({ type: 'integer', name: 'printingProof', nullable: true })
    @ApiProperty({ required: false })
    printingProof: number;

    @Column({ type: 'integer', name: 'uploadReplyCard', nullable: true })
    @ApiProperty({ required: false })
    uploadReplyCard: number;

    @Column({ type: 'datetime', name: 'date', nullable: true })
    @ApiProperty({ required: false })
    date: Date;

    @Column({ type: 'text', name: 'image', nullable: true })
    @ApiProperty({ required: false })
    image: string;

    @Column({ name: 'imageContentType', nullable: true })
    @ApiProperty({ required: false })
    imageContentType: string;

    @Column({ type: 'integer', name: 'correctionEssayQuestions', nullable: true })
    @ApiProperty({ required: false })
    correctionEssayQuestions: number;

    @Column({ type: 'integer', name: 'releaseResults', nullable: true })
    @ApiProperty({ required: false })
    releaseResults: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Column({ name: 'createdBy', nullable: true })
    @ApiProperty({ required: false })
    createdBy?: Number;

    @Column({ name: 'createdDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    createdDate?: Date;

    @Column({ name: 'lastModifiedBy', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedBy?: Number;

    @Column({ name: 'lastModifiedDate', type: 'datetime', nullable: true })
    @ApiProperty({ required: false })
    lastModifiedDate?: Date;
}

export default CerneSchool;
