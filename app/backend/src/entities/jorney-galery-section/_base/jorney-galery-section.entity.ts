/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyGalery } from '../../jorney-galery/_base/jorney-galery.entity';
import { JorneyGalerySectionSubject } from '../../jorney-galery-section-subject/_base/jorney-galery-section-subject.entity';
import { JorneyGalerySectionType } from './jorney-galery-section-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['JorneyGalerySection'] ?? 'JorneyGalerySection')
export class JorneyGalerySection extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            link: String,
            linkContentType: String,
            text: String,
            textOrigin: String,
            isActive: Boolean,
            canEdit: Boolean,
            jorneyGalerySectionType: JorneyGalerySectionType,
            jorneyGalery: JorneyGalery,
            jorneyGalerySectionSubjects: JorneyGalerySectionSubject,
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

    @Column({ type: 'text', name: 'link', nullable: true })
    @ApiProperty({ required: false })
    link: string;

    @Column({ name: 'linkContentType', nullable: true })
    @ApiProperty({ required: false })
    linkContentType: string;

    @Column({ type: 'text', name: 'text', nullable: true })
    @ApiProperty({ required: false })
    text: string;

    @Column({ type: 'text', name: 'textOrigin', nullable: true })
    @ApiProperty({ required: false })
    textOrigin: string;

    @Column({ name: 'isActive', nullable: true })
    @ApiProperty({ required: false })
    isActive: boolean;

    @Column({ name: 'canEdit', nullable: true })
    @ApiProperty({ required: false })
    canEdit: boolean;

    @Column({ type: 'simple-enum', name: 'jorneyGalerySectionType', enum: JorneyGalerySectionType, nullable: true })
    @ApiProperty({ required: false })
    jorneyGalerySectionType: JorneyGalerySectionType;

    @ManyToOne(() => JorneyGalery, (other) => other.jorneyGalerySections)
    jorneyGalery: JorneyGalery;

    @OneToMany(() => JorneyGalerySectionSubject, (other) => other.jorneyGalerySections)
    jorneyGalerySectionSubjects: JorneyGalerySectionSubject[];

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

export default JorneyGalerySection;
