/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Theme } from '../../theme/_base/theme.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ThemePdf'] ?? 'ThemePdf')
export class ThemePdf extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            linkProposal: String,
            linkManual: String,
            theme: Theme,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'linkProposal', nullable: true })
    @ApiProperty({ required: false })
    linkProposal: string;

    @Column({ name: 'linkManual', nullable: true })
    @ApiProperty({ required: false })
    linkManual: string;

    @ManyToOne(() => Theme, (other) => other.themePdf)
    theme: Theme;

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

export default ThemePdf;
