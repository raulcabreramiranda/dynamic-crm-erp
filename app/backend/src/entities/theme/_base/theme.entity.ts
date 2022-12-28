/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { EssayPreUpload } from '../../essay-pre-upload/_base/essay-pre-upload.entity';
import { ConfigureApplication } from '../../configure-application/_base/configure-application.entity';
import { ConfigureCorrection } from '../../configure-correction/_base/configure-correction.entity';
import { JorneyDegreesThemes } from '../../jorney-degrees-themes/_base/jorney-degrees-themes.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';
import { Jorney } from '../../jorney/_base/jorney.entity';
import { ThemePdf } from '../../theme-pdf/_base/theme-pdf.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['Theme'] ?? 'Theme')
export class Theme extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            name: String,
            proposalText: String,
            proposalImagem: String,
            proposalImagemContentType: String,
            order: Number,
            active: Boolean,
            externalIntegrationId: String,
            proposalVideo: String,
            remake: Boolean,
            startDate: Date,
            endDate: Date,
            essayPreUploads: EssayPreUpload,
            configureApplications: ConfigureApplication,
            configureCorrections: ConfigureCorrection,
            jorneyDegreesThemes: JorneyDegreesThemes,
            cerneDegree: CerneDegree,
            jorney: Jorney,
            themePdf: ThemePdf,
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

    @Column({ type: 'text', name: 'proposalText', nullable: true })
    @ApiProperty({ required: false })
    proposalText: string;

    @Column({ type: 'text', name: 'proposalImagem', nullable: true })
    @ApiProperty({ required: false })
    proposalImagem: string;

    @Column({ name: 'proposalImagemContentType', nullable: true })
    @ApiProperty({ required: false })
    proposalImagemContentType: string;

    @Column({ type: 'integer', name: 'order', nullable: true })
    @ApiProperty({ required: false })
    order: number;

    @Column({ name: 'active', nullable: true })
    @ApiProperty({ required: false })
    active: boolean;

    @Column({ name: 'externalIntegrationId', nullable: true })
    @ApiProperty({ required: false })
    externalIntegrationId: string;

    @Column({ name: 'proposalVideo', nullable: true })
    @ApiProperty({ required: false })
    proposalVideo: string;

    @Column({ name: 'remake', nullable: true })
    @ApiProperty({ required: false })
    remake: boolean;

    @Column({ type: 'datetime', name: 'startDate', nullable: true })
    @ApiProperty({ required: false })
    startDate: Date;

    @Column({ type: 'datetime', name: 'endDate', nullable: true })
    @ApiProperty({ required: false })
    endDate: Date;

    @OneToMany(() => EssayPreUpload, (other) => other.theme)
    essayPreUploads: EssayPreUpload[];

    @OneToMany(() => ConfigureApplication, (other) => other.theme)
    configureApplications: ConfigureApplication[];

    @OneToMany(() => ConfigureCorrection, (other) => other.theme)
    configureCorrections: ConfigureCorrection[];

    @OneToMany(() => JorneyDegreesThemes, (other) => other.theme)
    jorneyDegreesThemes: JorneyDegreesThemes[];

    @ManyToOne(() => CerneDegree, (other) => other.themes)
    cerneDegree: CerneDegree;

    @ManyToOne(() => Jorney, (other) => other.themes)
    jorney: Jorney;

    @OneToMany(() => ThemePdf, (other) => other.theme)
    themePdf: ThemePdf[];

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

export default Theme;
