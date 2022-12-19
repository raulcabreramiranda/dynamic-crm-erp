/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { Theme } from '../../theme/_base/theme.entity';
import { Essay } from '../../essay/_base/essay.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['EssayPreUpload'] ?? 'EssayPreUpload')
export class EssayPreUpload extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            typedImage: String,
            jorneyDegree: JorneyDegree,
            theme: Theme,
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

    @Column({ name: 'typedImage', nullable: true })
    @ApiProperty({ required: false })
    typedImage: string;

    @ManyToOne(() => JorneyDegree)
    jorneyDegree: JorneyDegree;

    @ManyToOne(() => Theme)
    theme: Theme;

    @OneToOne(() => Essay)
    @JoinColumn()
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

export default EssayPreUpload;
