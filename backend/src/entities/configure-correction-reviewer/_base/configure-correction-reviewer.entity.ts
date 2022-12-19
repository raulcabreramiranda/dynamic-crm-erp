/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { ConfigureCorrection } from '../../configure-correction/_base/configure-correction.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';

import tablesName from '../../tablesName';

@Entity(tablesName['ConfigureCorrectionReviewer'] ?? 'ConfigureCorrectionReviewer')
export class ConfigureCorrectionReviewer extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            percent: Number,
            configureCorrection: ConfigureCorrection,
            user: AdminUser,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'percent', nullable: true })
    @ApiProperty({ required: false })
    percent: number;

    @ManyToOne(() => ConfigureCorrection, (other) => other.configureCorrectionReviewers)
    configureCorrection: ConfigureCorrection;

    @ManyToOne(() => AdminUser, (other) => other.configureCorrectionReviewers)
    user: AdminUser;

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

export default ConfigureCorrectionReviewer;
