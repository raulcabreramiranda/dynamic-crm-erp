/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../domain/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { EssayPreUpload } from '../../essay-pre-upload/_base/essay-pre-upload.entity';
import { CerneClass } from '../../cerne-class/_base/cerne-class.entity';
import { JorneyDegree } from '../../jorney-degree/_base/jorney-degree.entity';
import { AdminUser } from '../../admin-user/_base/admin-user.entity';
import { Matrix } from '../../matrix/_base/matrix.entity';
import { ConfigureApplication } from '../../configure-application/_base/configure-application.entity';
import { ConfigureCorrection } from '../../configure-correction/_base/configure-correction.entity';
import { EssayResult } from '../../essay-result/_base/essay-result.entity';
import { EssayExternalReview } from '../../essay-external-review/_base/essay-external-review.entity';
import { EssayType } from './essay-type.enum';

import tablesName from '../../tablesName';

@Entity(tablesName['Essay'] ?? 'Essay')
export class Essay extends BaseEntity {
    static columnsMetaData() {
        return {
            whiteLabel: Number,
            qtconsultationsExternal: Number,
            active: Boolean,
            startTime: Date,
            endTime: Date,
            reviewStartTime: Date,
            reviewEndTime: Date,
            essayType: EssayType,
            typedText: String,
            typedImage: String,
            typedImageContentType: String,
            reviewComment: String,
            reOpenEndTime: Date,
            lastClientDataDevice: String,
            allowReUploadImage: Boolean,
            commentsList: String,
            essayPreUpload: EssayPreUpload,
            cerneClass: CerneClass,
            jorneyDegree: JorneyDegree,
            user: AdminUser,
            matrix: Matrix,
            configureApplication: ConfigureApplication,
            configureCorrection: ConfigureCorrection,
            essayResults: EssayResult,
            reviewUser: AdminUser,
            essayExternalReviews: EssayExternalReview,
            createdBy: Number,
            createdDate: Date,
            lastModifiedBy: Number,
            lastModifiedDate: Date,
        };
    }

    @Column({ name: 'whiteLabel', nullable: true })
    @ApiProperty({ required: false })
    whiteLabel?: Number;

    @Column({ type: 'integer', name: 'qtconsultationsExternal', nullable: true })
    @ApiProperty({ required: false })
    qtconsultationsExternal: number;

    @Column({ name: 'active', nullable: true })
    @ApiProperty({ required: false })
    active: boolean;

    @Column({ type: 'datetime', name: 'startTime', nullable: true })
    @ApiProperty({ required: false })
    startTime: Date;

    @Column({ type: 'datetime', name: 'endTime', nullable: true })
    @ApiProperty({ required: false })
    endTime: Date;

    @Column({ type: 'datetime', name: 'reviewStartTime', nullable: true })
    @ApiProperty({ required: false })
    reviewStartTime: Date;

    @Column({ type: 'datetime', name: 'reviewEndTime', nullable: true })
    @ApiProperty({ required: false })
    reviewEndTime: Date;

    @Column({ type: 'simple-enum', name: 'essayType', enum: EssayType, nullable: true })
    @ApiProperty({ required: false })
    essayType: EssayType;

    @Column({ type: 'text', name: 'typedText', nullable: true })
    @ApiProperty({ required: false })
    typedText: string;

    @Column({ type: 'text', name: 'typedImage', nullable: true })
    @ApiProperty({ required: false })
    typedImage: string;

    @Column({ name: 'typedImageContentType', nullable: true })
    @ApiProperty({ required: false })
    typedImageContentType: string;

    @Column({ type: 'text', name: 'reviewComment', nullable: true })
    @ApiProperty({ required: false })
    reviewComment: string;

    @Column({ type: 'datetime', name: 'reOpenEndTime', nullable: true })
    @ApiProperty({ required: false })
    reOpenEndTime: Date;

    @Column({ name: 'lastClientDataDevice', nullable: true })
    @ApiProperty({ required: false })
    lastClientDataDevice: string;

    @Column({ name: 'allowReUploadImage', nullable: true })
    @ApiProperty({ description: 'Permitir subir a imagem de novo', required: false })
    allowReUploadImage: boolean;

    @Column({ type: 'text', name: 'commentsList', nullable: true })
    @ApiProperty({ required: false })
    commentsList: string;

    @OneToOne(() => EssayPreUpload)
    essayPreUpload: EssayPreUpload;

    @ManyToOne(() => CerneClass)
    cerneClass: CerneClass;

    @ManyToOne(() => JorneyDegree, (other) => other.essays)
    jorneyDegree: JorneyDegree;

    @ManyToOne(() => AdminUser, (other) => other.essays)
    user: AdminUser;

    @ManyToOne(() => Matrix, (other) => other.essays)
    matrix: Matrix;

    @ManyToOne(() => ConfigureApplication, (other) => other.essays)
    configureApplication: ConfigureApplication;

    @ManyToOne(() => ConfigureCorrection, (other) => other.essays)
    configureCorrection: ConfigureCorrection;

    @OneToMany(() => EssayResult, (other) => other.essay)
    essayResults: EssayResult[];

    @ManyToOne(() => AdminUser, (other) => other.reviewEssays)
    reviewUser: AdminUser;

    @OneToMany(() => EssayExternalReview, (other) => other.essay)
    essayExternalReviews: EssayExternalReview[];

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

export default Essay;
