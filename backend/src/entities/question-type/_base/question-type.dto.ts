/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A QuestionType DTO object.
 */
export class QuestionTypeDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'difficulty field', required: false })
    difficulty: number;

    @ApiProperty({ description: 'discrimination field', required: false })
    discrimination: number;

    @ApiProperty({ description: 'pseudoGuessing field', required: false })
    pseudoGuessing: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
