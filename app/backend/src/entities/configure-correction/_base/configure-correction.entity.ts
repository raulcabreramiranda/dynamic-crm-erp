/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Essay } from '../../essay/_base/essay.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { Theme } from '../../theme/_base/theme.entity';
import { ConfigureCorrectionReviewer } from '../../configure-correction-reviewer/_base/configure-correction-reviewer.entity';
import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { ConfigureCorrectionOptions } from './configure-correction-options.enum';
import { ConfigureCorrectionIa } from './configure-correction-ia.enum';
import { NotesReturnConfigure } from './notes-return-configure.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['ConfigureCorrection'] ?? 'ConfigureCorrection')
export class ConfigureCorrection extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            configureCorrectionOptions: ConfigureCorrectionOptions,
            configureCorrectionIa: ConfigureCorrectionIa,
            notesReturnConfigure: NotesReturnConfigure,
            notesReturnMinimumDate: Date,
            essays: Essay,
            cerneClass: CerneClass,
            theme: Theme,
            configureCorrectionReviewers: ConfigureCorrectionReviewer,
            jorneyDegree: JorneyDegree,
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

    @Column({ type: 'simple-enum', name: 'configureCorrectionOptions', enum: ConfigureCorrectionOptions, nullable: true })
    @ApiProperty({ required: false })
    configureCorrectionOptions: ConfigureCorrectionOptions;

    @Column({ type: 'simple-enum', name: 'configureCorrectionIa', enum: ConfigureCorrectionIa, nullable: true })
    @ApiProperty({ required: false })
    configureCorrectionIa: ConfigureCorrectionIa;

    @Column({ type: 'simple-enum', name: 'notesReturnConfigure', enum: NotesReturnConfigure, nullable: true })
    @ApiProperty({ required: false })
    notesReturnConfigure: NotesReturnConfigure;

    @Column({ type: 'datetime', name: 'notesReturnMinimumDate', nullable: true })
    @ApiProperty({ required: false })
    notesReturnMinimumDate: Date;

    @OneToMany(() => Essay, (other) => other.configureCorrection)
    essays: Essay[];

    @ManyToOne(() => CerneClass, (other) => other.configureCorrections)
    cerneClass: CerneClass;

    @ManyToOne(() => Theme, (other) => other.configureCorrections)
    theme: Theme;

    @OneToMany(() => ConfigureCorrectionReviewer, (other) => other.configureCorrection)
    configureCorrectionReviewers: ConfigureCorrectionReviewer[];

    @ManyToOne(() => JorneyDegree, (other) => other.configureCorrection)
    jorneyDegree: JorneyDegree;

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

export default ConfigureCorrection;
