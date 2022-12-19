/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ReportByQuery } from '../../report-by-query/_base/report-by-query.entity';
import { ReportQueryTemplate } from '../../report-query-template/_base/report-query-template.entity';
import { ReportCategory } from '../../report-category/_base/report-category.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ReportSubquery'] ?? 'ReportSubquery')
export class ReportSubquery extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            queryDescription: String,
            title: String,
            reportByQuery: ReportByQuery,
            reportQueryTemplate: ReportQueryTemplate,
            reportCategory: ReportCategory,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'queryDescription', nullable: true })
    @ApiProperty({ required: false })
    queryDescription: string;

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @ManyToOne(() => ReportByQuery, (other) => other.reportSubquery)
    reportByQuery: ReportByQuery;

    @OneToMany(() => ReportQueryTemplate, (other) => other.reportSubquery)
    reportQueryTemplate: ReportQueryTemplate[];

    @ManyToOne(() => ReportCategory, (other) => other.reportSubquery)
    reportCategory: ReportCategory;

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

export default ReportSubquery;
