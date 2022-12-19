/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Theme } from '../../theme/_base/theme.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { Essay } from '../../essay/_base/essay.entity';
import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ConfigureApplication'] ?? 'ConfigureApplication')
export class ConfigureApplication extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            dateInitial: Date,
            dateFinal: Date,
            applicationPresential: Boolean,
            applicationOnline: Boolean,
            productionText: Boolean,
            productionPhoto: Boolean,
            prewiewCorrection: Boolean,
            previewLimitRewrite: Number,
            limitTime: Number,
            theme: Theme,
            cerneClass: CerneClass,
            essays: Essay,
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

    @Column({ type: 'datetime', name: 'dateInitial', nullable: true })
    @ApiProperty({ required: false })
    dateInitial: Date;

    @Column({ type: 'datetime', name: 'dateFinal', nullable: true })
    @ApiProperty({ required: false })
    dateFinal: Date;

    @Column({ name: 'applicationPresential', nullable: true })
    @ApiProperty({ required: false })
    applicationPresential: boolean;

    @Column({ name: 'applicationOnline', nullable: true })
    @ApiProperty({ required: false })
    applicationOnline: boolean;

    @Column({ name: 'productionText', nullable: true })
    @ApiProperty({ required: false })
    productionText: boolean;

    @Column({ name: 'productionPhoto', nullable: true })
    @ApiProperty({ required: false })
    productionPhoto: boolean;

    @Column({ name: 'prewiewCorrection', nullable: true })
    @ApiProperty({ required: false })
    prewiewCorrection: boolean;

    @Column({ type: 'integer', name: 'previewLimitRewrite', nullable: true })
    @ApiProperty({ required: false })
    previewLimitRewrite: number;

    @Column({ type: 'integer', name: 'limitTime', nullable: true })
    @ApiProperty({ required: false })
    limitTime: number;

    @ManyToOne(() => Theme, (other) => other.configureApplications)
    theme: Theme;

    @ManyToOne(() => CerneClass, (other) => other.configureApplications)
    cerneClass: CerneClass;

    @OneToMany(() => Essay, (other) => other.configureApplication)
    essays: Essay[];

    @ManyToOne(() => JorneyDegree, (other) => other.configureApplications)
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

export default ConfigureApplication;
