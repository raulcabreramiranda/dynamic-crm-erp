/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionLevel1DTO } from '../../question-level1/_base/question-level1.dto';

/**
 * A QuestionMatrix DTO object.
 */
export class QuestionMatrixDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'Level1name field', required: false })
    Level1name: string;

    @ApiProperty({ description: 'Level2name field', required: false })
    Level2name: string;

    @ApiProperty({ description: 'Level3name field', required: false })
    Level3name: string;

    @ApiProperty({ description: 'Level4name field', required: false })
    Level4name: string;

    @ApiProperty({ description: 'clientId field', required: false })
    clientId: number;

    @ApiProperty({ description: 'schoolId field', required: false })
    schoolId: number;

    @ApiProperty({ type: QuestionLevel1DTO, isArray: true, description: 'level1 relationship' })
    level1: QuestionLevel1DTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
