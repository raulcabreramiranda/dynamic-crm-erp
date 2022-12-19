/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ReportSubquery } from '../../report-subquery/_base/report-subquery.entity';
import { ReportByQuery } from '../../report-by-query/_base/report-by-query.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ReportCategory'] ?? 'ReportCategory')
export class ReportCategory extends BaseEntity {
    static columnsMetaData() {
        return {
            icon: String,
            title: String,
            description: String,
            platformId: Number,
            deletedBy: String,
            reportSubquery: ReportSubquery,
            reportByQuery: ReportByQuery,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'icon', nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @Column({ name: 'title', nullable: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ name: 'description', nullable: true })
    @ApiProperty({ required: false })
    description: string;

    @Column({ type: 'integer', name: 'platformId', nullable: true })
    @ApiProperty({ required: false })
    platformId: number;

    @Column({ name: 'deletedBy', nullable: true })
    @ApiProperty({ required: false })
    deletedBy: string;

    @OneToMany(() => ReportSubquery, (other) => other.reportCategory)
    reportSubquery: ReportSubquery[];

    @OneToMany(() => ReportByQuery, (other) => other.reportCategory)
    reportByQuery: ReportByQuery[];

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

export default ReportCategory;
