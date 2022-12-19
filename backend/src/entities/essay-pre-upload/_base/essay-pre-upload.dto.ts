/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { ThemeDTO } from '../../theme/_base/theme.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';

/**
 * A EssayPreUpload DTO object.
 */
export class EssayPreUploadDTO extends BaseDTO {
    @ApiProperty({ description: 'typedImage field', required: false })
    typedImage: string;

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegree relationship' })
    jorneyDegree: JorneyDegreeDTO;

    @ApiProperty({ type: ThemeDTO, description: 'theme relationship' })
    theme: ThemeDTO;

    @ApiProperty({ type: EssayDTO, description: 'essay relationship' })
    essay: EssayDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
