/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { ThemeDTO } from '../../theme/_base/theme.dto';
import { JorneyType } from '../../../entities/jorney/_base/jorney-type.enum';

/**
 * A Jorney DTO object.
 */
export class JorneyDTO extends BaseDTO {
    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ enum: JorneyType, description: 'jorneyType enum field', required: false })
    jorneyType: JorneyType;

    @ApiProperty({ description: 'jorneyDegrees_cerneDegree_name field', required: false })
    jorneyDegrees_cerneDegree_name: any;

    @ApiProperty({ description: 'imageBanner field', required: false })
    imageBanner: string;

    @ApiProperty({ description: 'clientId field', required: false })
    clientId: number;

    @ApiProperty({ type: JorneyDegreeDTO, isArray: true, description: 'jorneyDegrees relationship' })
    jorneyDegrees: JorneyDegreeDTO[];

    @ApiProperty({ type: ThemeDTO, isArray: true, description: 'themes relationship' })
    themes: ThemeDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
