/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayPreUploadDTO } from '../../essay-pre-upload/_base/essay-pre-upload.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { MatrixDTO } from '../../matrix/_base/matrix.dto';
import { ConfigureApplicationDTO } from '../../configure-application/_base/configure-application.dto';
import { ConfigureCorrectionDTO } from '../../configure-correction/_base/configure-correction.dto';
import { EssayResultDTO } from '../../essay-result/_base/essay-result.dto';
import { EssayExternalReviewDTO } from '../../essay-external-review/_base/essay-external-review.dto';
import { EssayType } from '../../../entities/essay/_base/essay-type.enum';

/**
 * A Essay DTO object.
 */
export class EssayDTO extends BaseDTO {
    @ApiProperty({ description: 'qtconsultationsExternal field', required: false })
    qtconsultationsExternal: number;

    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ description: 'startTime field', required: false })
    startTime: Date;

    @ApiProperty({ description: 'endTime field', required: false })
    endTime: Date;

    @ApiProperty({ description: 'reviewStartTime field', required: false })
    reviewStartTime: Date;

    @ApiProperty({ description: 'reviewEndTime field', required: false })
    reviewEndTime: Date;

    @ApiProperty({ enum: EssayType, description: 'essayType enum field', required: false })
    essayType: EssayType;

    @ApiProperty({ description: 'typedText field', required: false })
    typedText: string;

    @ApiProperty({ description: 'typedImage field', required: false })
    typedImage: string;

    @ApiProperty({ description: 'reviewComment field', required: false })
    reviewComment: string;

    @ApiProperty({ description: 'reOpenEndTime field', required: false })
    reOpenEndTime: Date;

    @ApiProperty({ description: 'lastClientDataDevice field', required: false })
    lastClientDataDevice: string;

    @ApiProperty({ description: 'allowReUploadImage field', required: false })
    allowReUploadImage: boolean;

    @ApiProperty({ description: 'commentsList field', required: false })
    commentsList: string;

    @ApiProperty({ type: EssayPreUploadDTO, description: 'essayPreUpload relationship' })
    essayPreUpload: EssayPreUploadDTO;

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegree relationship' })
    jorneyDegree: JorneyDegreeDTO;

    @ApiProperty({ type: AdminUserDTO, description: 'user relationship' })
    user: AdminUserDTO;

    @ApiProperty({ type: MatrixDTO, description: 'matrix relationship' })
    matrix: MatrixDTO;

    @ApiProperty({ type: ConfigureApplicationDTO, description: 'configureApplication relationship' })
    configureApplication: ConfigureApplicationDTO;

    @ApiProperty({ type: ConfigureCorrectionDTO, description: 'configureCorrection relationship' })
    configureCorrection: ConfigureCorrectionDTO;

    @ApiProperty({ type: EssayResultDTO, isArray: true, description: 'essayResults relationship' })
    essayResults: EssayResultDTO[];

    @ApiProperty({ type: AdminUserDTO, description: 'reviewUser relationship' })
    reviewUser: AdminUserDTO;

    @ApiProperty({ type: EssayExternalReviewDTO, isArray: true, description: 'essayExternalReviews relationship' })
    essayExternalReviews: EssayExternalReviewDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
