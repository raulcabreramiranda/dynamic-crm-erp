/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayPreUploadDTO } from '../../essay-pre-upload/_base/essay-pre-upload.dto';
import { ConfigureApplicationDTO } from '../../configure-application/_base/configure-application.dto';
import { ConfigureCorrectionDTO } from '../../configure-correction/_base/configure-correction.dto';
import { JorneyDegreesThemesDTO } from '../../jorney-degrees-themes/_base/jorney-degrees-themes.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';
import { JorneyDTO } from '../../jorney/_base/jorney.dto';
import { ThemePdfDTO } from '../../theme-pdf/_base/theme-pdf.dto';

/**
 * A Theme DTO object.
 */
export class ThemeDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'proposalText field', required: false })
    proposalText: string;

    @ApiProperty({ description: 'proposalImagem field', required: false })
    proposalImagem: string;

    @ApiProperty({ description: 'order field', required: false })
    order: number;

    @ApiProperty({ description: 'active field', required: false })
    active: boolean;

    @ApiProperty({ description: 'externalIntegrationId field', required: false })
    externalIntegrationId: string;

    @ApiProperty({ description: 'proposalVideo field', required: false })
    proposalVideo: string;

    @ApiProperty({ description: 'jorneyDegrees_jorney_name field', required: false })
    jorneyDegrees_jorney_name: any;

    @ApiProperty({ description: 'jorneyDegrees_theme_name field', required: false })
    jorneyDegrees_theme_name: any;

    @ApiProperty({ description: 'jorneyDegrees_cerneDegree_name field', required: false })
    jorneyDegrees_cerneDegree_name: any;

    @ApiProperty({ description: 'remake field', required: false })
    remake: boolean;

    @ApiProperty({ description: 'startDate field', required: false })
    startDate: Date;

    @ApiProperty({ description: 'endDate field', required: false })
    endDate: Date;

    @ApiProperty({ type: EssayPreUploadDTO, isArray: true, description: 'essayPreUploads relationship' })
    essayPreUploads: EssayPreUploadDTO[];

    @ApiProperty({ type: ConfigureApplicationDTO, isArray: true, description: 'configureApplications relationship' })
    configureApplications: ConfigureApplicationDTO[];

    @ApiProperty({ type: ConfigureCorrectionDTO, isArray: true, description: 'configureCorrections relationship' })
    configureCorrections: ConfigureCorrectionDTO[];

    @ApiProperty({ type: JorneyDegreesThemesDTO, isArray: true, description: 'jorneyDegreesThemes relationship' })
    jorneyDegreesThemes: JorneyDegreesThemesDTO[];

    @ApiProperty({ type: CerneDegreeDTO, description: 'cerneDegree relationship' })
    cerneDegree: CerneDegreeDTO;

    @ApiProperty({ type: JorneyDTO, description: 'jorney relationship' })
    jorney: JorneyDTO;

    @ApiProperty({ type: ThemePdfDTO, isArray: true, description: 'themePdf relationship' })
    themePdf: ThemePdfDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
