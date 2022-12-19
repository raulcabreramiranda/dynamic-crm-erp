/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ReportSubquery } from '../../report-subquery/_base/report-subquery.entity';
import { ReportCategory } from '../../report-category/_base/report-category.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ReportByQuery'] ?? 'ReportByQuery')
export class ReportByQuery extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            title: String,
            queryDescription: String,
            public: Boolean,
            icon: String,
            status: String,
            reportSubquery: ReportSubquery,
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

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ name: 'queryDescription', nullable: true })
    @ApiProperty({ required: false })
    queryDescription: string;

    @Column({ name: 'public', nullable: true })
    @ApiProperty({ required: false })
    public: boolean;

    @Column({ name: 'icon', nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @Column({ name: 'status', nullable: true })
    @ApiProperty({ required: false })
    status: string;

    @OneToMany(() => ReportSubquery, (other) => other.reportByQuery)
    reportSubquery: ReportSubquery[];

    @ManyToOne(() => ReportCategory, (other) => other.reportByQuery)
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

export default ReportByQuery;
