/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { ExamsMasterDTO } from '../../exams-master/_base/exams-master.dto';
import { Type } from '../../../entities/master/_base/type.enum';

/**
 * A Master DTO object.
 */
export class MasterDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ enum: Type, description: 'type enum field', required: false })
    type: Type;

    @ApiProperty({ type: ExamsMasterDTO, isArray: true, description: 'examsMaster relationship' })
    examsMaster: ExamsMasterDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
