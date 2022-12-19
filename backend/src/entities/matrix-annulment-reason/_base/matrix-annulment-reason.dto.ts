/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayResultDTO } from '../../essay-result/_base/essay-result.dto';
import { MatrixDTO } from '../../matrix/_base/matrix.dto';

/**
 * A MatrixAnnulmentReason DTO object.
 */
export class MatrixAnnulmentReasonDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'comment field', required: false })
    comment: string;

    @ApiProperty({ description: 'idRed1000 field', required: false })
    idRed1000: number;

    @ApiProperty({ type: EssayResultDTO, isArray: true, description: 'essayResult relationship' })
    essayResult: EssayResultDTO[];

    @ApiProperty({ type: MatrixDTO, description: 'matrix relationship' })
    matrix: MatrixDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
