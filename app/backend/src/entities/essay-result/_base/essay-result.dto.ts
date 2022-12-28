/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';
import { EssayDTO } from '../../essay/_base/essay.dto';
import { SkillItemDTO } from '../../skill-item/_base/skill-item.dto';
import { EssayResultCommentDTO } from '../../essay-result-comment/_base/essay-result-comment.dto';
import { MatrixAnnulmentReasonDTO } from '../../matrix-annulment-reason/_base/matrix-annulment-reason.dto';

/**
 * A EssayResult DTO object.
 */
export class EssayResultDTO extends BaseDTO {
    @ApiProperty({ description: 'bloqued field', required: false })
    bloqued: boolean;

    @ApiProperty({ description: 'dateInitial field', required: false })
    dateInitial: Date;

    @ApiProperty({ description: 'dateFinal field', required: false })
    dateFinal: Date;

    @ApiProperty({ description: 'delivered field', required: false })
    delivered: boolean;

    @ApiProperty({ description: 'isPreReview field', required: false })
    isPreReview: boolean;

    @ApiProperty({ description: 'scoreFinal field', required: false })
    scoreFinal: number;

    @ApiProperty({ description: 'finalComment field', required: false })
    finalComment: string;

    @ApiProperty({ type: AdminUserDTO, description: 'reviewer relationship' })
    reviewer: AdminUserDTO;

    @ApiProperty({ type: EssayDTO, description: 'essay relationship' })
    essay: EssayDTO;

    @ApiProperty({ type: SkillItemDTO, description: 'skillItem relationship' })
    skillItem: SkillItemDTO;

    @ApiProperty({ type: EssayResultCommentDTO, isArray: true, description: 'essayResultComment relationship' })
    essayResultComment: EssayResultCommentDTO[];

    @ApiProperty({ type: SkillItemDTO, description: 'skillItemFinal relationship' })
    skillItemFinal: SkillItemDTO;

    @ApiProperty({ type: MatrixAnnulmentReasonDTO, description: 'matrixAnnulmentReason relationship' })
    matrixAnnulmentReason: MatrixAnnulmentReasonDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
