/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { EssayPreUpload } from '../../essay-pre-upload/_base/essay-pre-upload.entity';
import { JorneyGalery } from '../../jorney-galery/_base/jorney-galery.entity';
import { Essay } from '../../essay/_base/essay.entity';
import { Jorney } from '../../jorney/_base/jorney.entity';
import { CerneDegree } from '../../cerne-degree/_base/cerne-degree.entity';
import { JorneyDegreesThemes } from '../../jorney-degrees-themes/_base/jorney-degrees-themes.entity';
import { ConfigureApplication } from '../../configure-application/_base/configure-application.entity';
import { ConfigureCorrection } from '../../configure-correction/_base/configure-correction.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['JorneyDegree'] ?? 'JorneyDegree')
export class JorneyDegree extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            active: Boolean,
            year: Number,
            essayPreUploads: EssayPreUpload,
            jorneyGalerys: JorneyGalery,
            essays: Essay,
            jorney: Jorney,
            cerneDegree: CerneDegree,
            jorneyDegreesThemes: JorneyDegreesThemes,
            configureApplications: ConfigureApplication,
            configureCorrection: ConfigureCorrection,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ name: 'active', nullable: true })
    @ApiProperty({ required: false })
    active: boolean;

    @Column({ type: 'integer', name: 'year', nullable: true })
    @ApiProperty({ required: false })
    year: number;

    @OneToMany(() => EssayPreUpload, (other) => other.jorneyDegree)
    essayPreUploads: EssayPreUpload[];

    @OneToMany(() => JorneyGalery, (other) => other.jorneyDegrees)
    jorneyGalerys: JorneyGalery[];

    @OneToMany(() => Essay, (other) => other.jorneyDegree)
    essays: Essay[];

    @ManyToOne(() => Jorney, (other) => other.jorneyDegrees)
    jorney: Jorney;

    @ManyToOne(() => CerneDegree, (other) => other.jorneyDegrees)
    cerneDegree: CerneDegree;

    @OneToMany(() => JorneyDegreesThemes, (other) => other.jorneyDegree)
    jorneyDegreesThemes: JorneyDegreesThemes[];

    @OneToMany(() => ConfigureApplication, (other) => other.jorneyDegree)
    configureApplications: ConfigureApplication[];

    @OneToMany(() => ConfigureCorrection, (other) => other.jorneyDegree)
    configureCorrection: ConfigureCorrection[];

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

export default JorneyDegree;
