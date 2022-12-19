/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ReportSubquery } from '../../report-subquery/_base/report-subquery.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ReportQueryTemplate'] ?? 'ReportQueryTemplate')
export class ReportQueryTemplate extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            templateName: String,
            groupBy: String,
            dimension: String,
            description: String,
            isPublic: Boolean,
            reportSubquery: ReportSubquery,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'templateName', nullable: true })
    @ApiProperty({ required: false })
    templateName: string;

    @Column({ name: 'groupBy', nullable: true })
    @ApiProperty({ required: false })
    groupBy: string;

    @Column({ name: 'dimension', nullable: true })
    @ApiProperty({ required: false })
    dimension: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ name: 'isPublic', nullable: true })
    @ApiProperty({ required: false })
    isPublic: boolean;

    @ManyToOne(() => ReportSubquery, (other) => other.reportQueryTemplate)
    reportSubquery: ReportSubquery;

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

export default ReportQueryTemplate;
