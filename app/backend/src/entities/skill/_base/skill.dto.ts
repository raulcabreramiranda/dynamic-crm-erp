/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { MatrixDTO } from '../../matrix/_base/matrix.dto';
import { SkillItemDTO } from '../../skill-item/_base/skill-item.dto';

/**
 * A Skill DTO object.
 */
export class SkillDTO extends BaseDTO {
    @ApiProperty({ description: 'sigla field', required: false })
    sigla: string;

    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'description field', required: false })
    description: string;

    @ApiProperty({ description: 'areaCompetence field', required: false })
    areaCompetence: number;

    @ApiProperty({ description: 'color field', required: false })
    color: string;

    @ApiProperty({ type: MatrixDTO, description: 'matrix relationship' })
    matrix: MatrixDTO;

    @ApiProperty({ type: SkillItemDTO, isArray: true, description: 'skillItems relationship' })
    skillItems: SkillItemDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
