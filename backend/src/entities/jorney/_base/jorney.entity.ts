/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { Theme } from '../../theme/_base/theme.entity';
import { JorneyType } from './jorney-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Jorney'] ?? 'Jorney')
export class Jorney extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            year: Number,
            name: String,
            jorneyType: JorneyType,
            imageBanner: String,
            imageBannerContentType: String,
            clientId: Number,
            jorneyDegrees: JorneyDegree,
            themes: Theme,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'year', nullable: true })
    @ApiProperty({ required: false })
    year: number;

    @Column({ name: 'name', nullable: true })
    @ApiProperty({ required: false })
    name: string;

    @Column({ type: 'simple-enum', name: 'jorneyType', enum: JorneyType, nullable: true })
    @ApiProperty({ required: false })
    jorneyType: JorneyType;

    @Column({ type: 'text', name: 'imageBanner', nullable: true })
    @ApiProperty({ required: false })
    imageBanner: string;

    @Column({ name: 'imageBannerContentType', nullable: true })
    @ApiProperty({ required: false })
    imageBannerContentType: string;

    @Column({ type: 'integer', name: 'clientId', nullable: true })
    @ApiProperty({ required: false })
    clientId: number;

    @OneToMany(() => JorneyDegree, (other) => other.jorney)
    jorneyDegrees: JorneyDegree[];

    @OneToMany(() => Theme, (other) => other.jorney)
    themes: Theme[];

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

export default Jorney;
