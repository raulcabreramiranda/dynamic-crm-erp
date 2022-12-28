/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { SkillDTO } from '../../skill/_base/skill.dto';
import { EssayResultDTO } from '../../essay-result/_base/essay-result.dto';

/**
 * A SkillItem DTO object.
 */
export class SkillItemDTO extends BaseDTO {
    @ApiProperty({ description: 'order field', required: false })
    order: number;

    @ApiProperty({ description: 'points field', required: false })
    points: number;

    @ApiProperty({ description: 'correctionFeedback field', required: false })
    correctionFeedback: string;

    @ApiProperty({ description: 'correctionSuggestion field', required: false })
    correctionSuggestion: string;

    @ApiProperty({ description: 'preCorrectionFeedback field', required: false })
    preCorrectionFeedback: string;

    @ApiProperty({ description: 'preCorrectionSuggestion field', required: false })
    preCorrectionSuggestion: string;

    @ApiProperty({ type: SkillDTO, description: 'skill relationship' })
    skill: SkillDTO;

    @ApiProperty({ type: EssayResultDTO, isArray: true, description: 'essayResults relationship' })
    essayResults: EssayResultDTO[];

    @ApiProperty({ type: EssayResultDTO, isArray: true, description: 'essayResultsFinal relationship' })
    essayResultsFinal: EssayResultDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
