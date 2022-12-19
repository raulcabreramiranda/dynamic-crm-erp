/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ThemeDTO } from '../../theme/_base/theme.dto';

/**
 * A ThemePdf DTO object.
 */
export class ThemePdfDTO extends BaseDTO {
    @ApiProperty({ description: 'linkProposal field', required: false })
    linkProposal: string;

    @ApiProperty({ description: 'linkManual field', required: false })
    linkManual: string;

    @ApiProperty({ type: ThemeDTO, description: 'theme relationship' })
    theme: ThemeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
