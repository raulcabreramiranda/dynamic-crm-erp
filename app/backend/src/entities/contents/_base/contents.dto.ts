/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { SubContentsDTO } from '../../sub-contents/_base/sub-contents.dto';
import { DisciplineDTO } from '../../discipline/_base/discipline.dto';
import { CerneDegreeDTO } from '../../cerne-degree/_base/cerne-degree.dto';

/**
 * A Contents DTO object.
 */
export class ContentsDTO extends BaseDTO {
    @ApiProperty({ description: 'code field', required: false })
    code: string;

    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ type: SubContentsDTO, isArray: true, description: 'subContents relationship' })
    subContents: SubContentsDTO[];

    @ApiProperty({ type: DisciplineDTO, description: 'discipline relationship' })
    discipline: DisciplineDTO;

    @ApiProperty({ type: CerneDegreeDTO, description: 'series relationship' })
    series: CerneDegreeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
