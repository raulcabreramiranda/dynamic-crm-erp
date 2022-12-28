/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyGaleryDTO } from '../../jorney-galery/_base/jorney-galery.dto';
import { JorneyGalerySectionSubjectDTO } from '../../jorney-galery-section-subject/_base/jorney-galery-section-subject.dto';
import { JorneyGalerySectionType } from './jorney-galery-section-type.enum';

/**
 * A JorneyGalerySection DTO object.
 */
export class JorneyGalerySectionDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'link field', required: false })
    link: string;

    @ApiProperty({ description: 'text field', required: false })
    text: string;

    @ApiProperty({ description: 'textOrigin field', required: false })
    textOrigin: string;

    @ApiProperty({ description: 'isActive field', required: false })
    isActive: boolean;

    @ApiProperty({ description: 'canEdit field', required: false })
    canEdit: boolean;

    @ApiProperty({ enum: JorneyGalerySectionType, description: 'jorneyGalerySectionType enum field', required: false })
    jorneyGalerySectionType: JorneyGalerySectionType;

    @ApiProperty({ type: JorneyGaleryDTO, description: 'jorneyGalery relationship' })
    jorneyGalery: JorneyGaleryDTO;

    @ApiProperty({ type: JorneyGalerySectionSubjectDTO, isArray: true, description: 'jorneyGalerySectionSubjects relationship' })
    jorneyGalerySectionSubjects: JorneyGalerySectionSubjectDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
