/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionDTO } from '../../question/_base/question.dto';

/**
 * A QuestionAlternative DTO object.
 */
export class QuestionAlternativeDTO extends BaseDTO {
    @ApiProperty({ description: 'position field', required: false })
    position: number;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'correct field', required: false })
    correct: boolean;

    @ApiProperty({ description: 'rtfLink field', required: false })
    rtfLink: string;

    @ApiProperty({ type: QuestionDTO, description: 'question relationship' })
    question: QuestionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
