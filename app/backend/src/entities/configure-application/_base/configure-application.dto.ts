/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ThemeDTO } from '../../theme/_base/theme.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';
import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';

/**
 * A ConfigureApplication DTO object.
 */
export class ConfigureApplicationDTO extends BaseDTO {
    @ApiProperty({ description: 'dateInitial field', required: false })
    dateInitial: Date;

    @ApiProperty({ description: 'dateFinal field', required: false })
    dateFinal: Date;

    @ApiProperty({ description: 'applicationPresential field', required: false })
    applicationPresential: boolean;

    @ApiProperty({ description: 'applicationOnline field', required: false })
    applicationOnline: boolean;

    @ApiProperty({ description: 'productionText field', required: false })
    productionText: boolean;

    @ApiProperty({ description: 'productionPhoto field', required: false })
    productionPhoto: boolean;

    @ApiProperty({ description: 'prewiewCorrection field', required: false })
    prewiewCorrection: boolean;

    @ApiProperty({ description: 'previewLimitRewrite field', required: false })
    previewLimitRewrite: number;

    @ApiProperty({ description: 'limitTime field', required: false })
    limitTime: number;

    @ApiProperty({ type: ThemeDTO, description: 'theme relationship' })
    theme: ThemeDTO;

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegree relationship' })
    jorneyDegree: JorneyDegreeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
