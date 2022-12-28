/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { QuestionDTO } from '../../question/_base/question.dto';
import { QuestionLevel1DTO } from '../../question-level1/_base/question-level1.dto';
import { QuestionLevel2DTO } from '../../question-level2/_base/question-level2.dto';
import { QuestionLevel3DTO } from '../../question-level3/_base/question-level3.dto';
import { QuestionLevel4DTO } from '../../question-level4/_base/question-level4.dto';

/**
 * A QuestionLevels DTO object.
 */
export class QuestionLevelsDTO extends BaseDTO {
    @ApiProperty({ type: QuestionDTO, description: 'question relationship' })
    question: QuestionDTO;

    @ApiProperty({ type: QuestionLevel1DTO, description: 'level1 relationship' })
    level1: QuestionLevel1DTO;

    @ApiProperty({ type: QuestionLevel2DTO, description: 'level2 relationship' })
    level2: QuestionLevel2DTO;

    @ApiProperty({ type: QuestionLevel3DTO, description: 'level3 relationship' })
    level3: QuestionLevel3DTO;

    @ApiProperty({ type: QuestionLevel4DTO, description: 'level4 relationship' })
    level4: QuestionLevel4DTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
