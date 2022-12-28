/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayDTO } from '../../essay/_base/essay.dto';
import { CerneClassDTO } from '../../cerne-class/_base/cerne-class.dto';
import { ThemeDTO } from '../../theme/_base/theme.dto';
import { ConfigureCorrectionReviewerDTO } from '../../configure-correction-reviewer/_base/configure-correction-reviewer.dto';
import { JorneyDegreeDTO } from '../../jorney-degree/_base/jorney-degree.dto';
import { ConfigureCorrectionOptions } from './configure-correction-options.enum';
import { ConfigureCorrectionIa } from './configure-correction-ia.enum';
import { NotesReturnConfigure } from './notes-return-configure.enum';

/**
 * A ConfigureCorrection DTO object.
 */
export class ConfigureCorrectionDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ enum: ConfigureCorrectionOptions, description: 'configureCorrectionOptions enum field', required: false })
    configureCorrectionOptions: ConfigureCorrectionOptions;

    @ApiProperty({ enum: ConfigureCorrectionIa, description: 'configureCorrectionIa enum field', required: false })
    configureCorrectionIa: ConfigureCorrectionIa;

    @ApiProperty({ enum: NotesReturnConfigure, description: 'notesReturnConfigure enum field', required: false })
    notesReturnConfigure: NotesReturnConfigure;

    @ApiProperty({ description: 'notesReturnMinimumDate field', required: false })
    notesReturnMinimumDate: Date;

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: CerneClassDTO, description: 'cerneClass relationship' })
    cerneClass: CerneClassDTO;

    @ApiProperty({ type: ThemeDTO, description: 'theme relationship' })
    theme: ThemeDTO;

    @ApiProperty({ type: ConfigureCorrectionReviewerDTO, isArray: true, description: 'configureCorrectionReviewers relationship' })
    configureCorrectionReviewers: ConfigureCorrectionReviewerDTO[];

    @ApiProperty({ type: JorneyDegreeDTO, description: 'jorneyDegree relationship' })
    jorneyDegree: JorneyDegreeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
