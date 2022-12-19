/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { ThemeDTO } from '../../theme/_base/theme.dto';

/**
 * A JorneyDegreesThemes DTO object.
 */
export class JorneyDegreesThemesDTO extends BaseDTO {
    @ApiProperty({ description: 'startDate field', required: false })
    startDate: Date;

    @ApiProperty({ description: 'endDate field', required: false })
    endDate: Date;

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegree relationship' })
    jorneyDegree: JorneyDegreeDTO;

    @ApiProperty({ type: ThemeDTO, description: 'theme relationship' })
    theme: ThemeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
