/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { EssayDTO } from '../../essay/_base/essay.dto';
import { MatrixAnnulmentReasonDTO } from '../../matrix-annulment-reason/_base/matrix-annulment-reason.dto';
import { SkillDTO } from '../../skill/_base/skill.dto';

/**
 * A Matrix DTO object.
 */
export class MatrixDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ type: EssayDTO, isArray: true, description: 'essays relationship' })
    essays: EssayDTO[];

    @ApiProperty({ type: MatrixAnnulmentReasonDTO, isArray: true, description: 'matrixAnnulmentReasons relationship' })
    matrixAnnulmentReasons: MatrixAnnulmentReasonDTO[];

    @ApiProperty({ type: SkillDTO, isArray: true, description: 'skills relationship' })
    skills: SkillDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
