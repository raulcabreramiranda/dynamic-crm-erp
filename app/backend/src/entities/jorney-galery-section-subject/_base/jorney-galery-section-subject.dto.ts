/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyGalerySectionDTO } from '../../jorney-galery-section/_base/jorney-galery-section.dto';

/**
 * A JorneyGalerySectionSubject DTO object.
 */
export class JorneyGalerySectionSubjectDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'contents field', required: false })
    contents: string;

    @ApiProperty({ description: 'image field', required: false })
    image: string;

    @ApiProperty({ type: JorneyGalerySectionDTO, description: 'jorneyGalerySections relationship' })
    jorneyGalerySections: JorneyGalerySectionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
