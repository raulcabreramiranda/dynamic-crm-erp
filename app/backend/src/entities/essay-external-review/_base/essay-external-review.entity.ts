/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Essay } from '../../essay/_base/essay.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['EssayExternalReview'] ?? 'EssayExternalReview')
export class EssayExternalReview extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            externalId: String,
            externalReviewId: String,
            essayExternalSendData: Date,
            essayExternalCheckData: Date,
            essayExternalReplay: String,
            status: String,
            essay: Essay,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'externalId', nullable: true })
    @ApiProperty({ required: false })
    externalId: string;

    @Column({ name: 'externalReviewId', nullable: true })
    @ApiProperty({ required: false })
    externalReviewId: string;

    @Column({ type: 'datetime', name: 'essayExternalSendData', nullable: true })
    @ApiProperty({ required: false })
    essayExternalSendData: Date;

    @Column({ type: 'datetime', name: 'essayExternalCheckData', nullable: true })
    @ApiProperty({ required: false })
    essayExternalCheckData: Date;

    @Column({ type: 'text', name: 'essayExternalReplay', nullable: true })
    @ApiProperty({ required: false })
    essayExternalReplay: string;

    @Column({ name: 'status', nullable: true })
    @ApiProperty({ required: false })
    status: string;

    @ManyToOne(() => Essay, (other) => other.essayExternalReviews)
    essay: Essay;

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

export default EssayExternalReview;
