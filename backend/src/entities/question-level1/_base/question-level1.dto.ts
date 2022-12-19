/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionMatrixDTO } from '../../question-matrix/_base/question-matrix.dto';
import { QuestionLevel2DTO } from '../../question-level2/_base/question-level2.dto';
import { QuestionLevelsDTO } from '../../question-levels/_base/question-levels.dto';

/**
 * A QuestionLevel1 DTO object.
 */
export class QuestionLevel1DTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'type field', required: false })
    type: number;

    @ApiProperty({ description: 'externalCode field', required: false })
    externalCode: number;

    @ApiProperty({ description: 'shortName field', required: false })
    shortName: string;

    @ApiProperty({ type: QuestionMatrixDTO, description: 'matrix relationship' })
    matrix: QuestionMatrixDTO;

    @ApiProperty({ type: QuestionLevel2DTO, isArray: true, description: 'level2 relationship' })
    level2: QuestionLevel2DTO[];

    @ApiProperty({ type: QuestionLevelsDTO, isArray: true, description: 'questionLevels relationship' })
    questionLevels: QuestionLevelsDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
