/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayResultDTO } from '../../essay-result/_base/essay-result.dto';

/**
 * A EssayResultComment DTO object.
 */
export class EssayResultCommentDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ type: EssayResultDTO, description: 'essayResult relationship' })
    essayResult: EssayResultDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
