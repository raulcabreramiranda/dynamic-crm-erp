/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayPreUploadDTO } from '../../essay-pre-upload/_base/essay-pre-upload.dto';
import { JorneyGaleryDTO } from '../../jorney-galery/_base/jorney-galery.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';
import { JorneyDTO } from '../../jorney/_base/jorney.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';
import { JorneyDegreesThemesDTO } from '../../jorney-degrees-themes/_base/jorney-degrees-themes.dto';
import { ConfigureApplicationDTO } from '../../configure-application/_base/configure-application.dto';
import { ConfigureCorrectionDTO } from '../../configure-correction/_base/configure-correction.dto';

/**
 * A JorneyDegree DTO object.
 */
export class JorneyDegreeDTO extends BaseDTO {
    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ description: 'year field', required: false })
    year: number;

    @ApiProperty({ type: EssayPreUploadDTO, isArray: true, description: 'essayPreUploads relationship' })
    essayPreUploads: EssayPreUploadDTO[];

    @ApiProperty({ type: JorneyGaleryDTO, isArray: true, description: 'jorneyGalerys relationship' })
    jorneyGalerys: JorneyGaleryDTO[];

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: JorneyDTO, description: 'jorney relationship' })
    jorney: JorneyDTO;

    @ApiProperty({ type: CerneDegreeDTO, description: 'cerneDegree relationship' })
    cerneDegree: CerneDegreeDTO;

    @ApiProperty({ type: JorneyDegreesThemesDTO, isArray: true, description: 'jorneyDegreesThemes relationship' })
    jorneyDegreesThemes: JorneyDegreesThemesDTO[];

    @ApiProperty({ type: ConfigureApplicationDTO, isArray: true, description: 'configureApplications relationship' })
    configureApplications: ConfigureApplicationDTO[];

    @ApiProperty({ type: ConfigureCorrectionDTO, isArray: true, description: 'configureCorrection relationship' })
    configureCorrection: ConfigureCorrectionDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
