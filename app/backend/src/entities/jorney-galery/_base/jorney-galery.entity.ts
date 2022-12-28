/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { JorneyGalerySection } from '../../jorney-galery-section/_base/jorney-galery-section.entity';
import { JorneyGaleryType } from './jorney-galery-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['JorneyGalery'] ?? 'JorneyGalery')
export class JorneyGalery extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            canEdit: Boolean,
            isInsideSubject: Boolean,
            jorneyGaleryType: JorneyGaleryType,
            jorneyDegrees: JorneyDegree,
            jorneyGalerySections: JorneyGalerySection,
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

    @Column({ name: 'canEdit', nullable: true })
    @ApiProperty({ required: false })
    canEdit: boolean;

    @Column({ name: 'isInsideSubject', nullable: true })
    @ApiProperty({ required: false })
    isInsideSubject: boolean;

    @Column({ type: 'simple-enum', name: 'jorneyGaleryType', enum: JorneyGaleryType, nullable: true })
    @ApiProperty({ required: false })
    jorneyGaleryType: JorneyGaleryType;

    @ManyToOne(() => JorneyDegree, (other) => other.jorneyGalerys)
    jorneyDegrees: JorneyDegree;

    @OneToMany(() => JorneyGalerySection, (other) => other.jorneyGalery)
    jorneyGalerySections: JorneyGalerySection[];

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

export default JorneyGalery;
