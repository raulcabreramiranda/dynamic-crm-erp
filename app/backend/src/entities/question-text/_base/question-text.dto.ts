/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionDTO } from '../../question/_base/question.dto';

/**
 * A QuestionText DTO object.
 */
export class QuestionTextDTO extends BaseDTO {
    @ApiProperty({ description: 'position field', required: false })
    position: number;

    @ApiProperty({ description: 'text field', required: false })
    text: string;

    @ApiProperty({ description: 'imgText field', required: false })
    imgText: string;

    @ApiProperty({ type: QuestionDTO, description: 'question relationship' })
    question: QuestionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
