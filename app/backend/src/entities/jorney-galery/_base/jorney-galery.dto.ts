/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { JorneyGalerySectionDTO } from '../../jorney-galery-section/_base/jorney-galery-section.dto';
import { JorneyGaleryType } from './jorney-galery-type.enum';

/**
 * A JorneyGalery DTO object.
 */
export class JorneyGaleryDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'canEdit field', required: false })
    canEdit: boolean;

    @ApiProperty({ description: 'isInsideSubject field', required: false })
    isInsideSubject: boolean;

    @ApiProperty({ description: 'jorneyDegrees_jorney_name field', required: false })
    jorneyDegrees_jorney_name: any;

    @ApiProperty({ description: 'orneyDegrees_theme_name field', required: false })
    orneyDegrees_theme_name: any;

    @ApiProperty({ description: 'orneyDegrees_cerneDegree_name field', required: false })
    orneyDegrees_cerneDegree_name: any;

    @ApiProperty({ enum: JorneyGaleryType, description: 'jorneyGaleryType enum field', required: false })
    jorneyGaleryType: JorneyGaleryType;

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegrees relationship' })
    jorneyDegrees: JorneyDegreeDTO;

    @ApiProperty({ type: JorneyGalerySectionDTO, isArray: true, description: 'jorneyGalerySections relationship' })
    jorneyGalerySections: JorneyGalerySectionDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
