/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyGalerySection } from '../../jorney-galery-section/_base/jorney-galery-section.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['JorneyGalerySectionSubject'] ?? 'JorneyGalerySectionSubject')
export class JorneyGalerySectionSubject extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            contents: String,
            image: String,
            imageContentType: String,
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

    @Column({ type: 'text', name: 'contents', nullable: true })
    @ApiProperty({ required: false })
    contents: string;

    @Column({ type: 'text', name: 'image', nullable: true })
    @ApiProperty({ required: false })
    image: string;

    @Column({ name: 'imageContentType', nullable: true })
    @ApiProperty({ required: false })
    imageContentType: string;

    @ManyToOne(() => JorneyGalerySection, (other) => other.jorneyGalerySectionSubjects)
    jorneyGalerySections: JorneyGalerySection;

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

export default JorneyGalerySectionSubject;
