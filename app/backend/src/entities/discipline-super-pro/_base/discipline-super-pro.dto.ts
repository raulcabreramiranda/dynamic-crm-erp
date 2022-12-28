/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A DisciplineSuperPro DTO object.
 */
export class DisciplineSuperProDTO extends BaseDTO {
    @ApiProperty({ description: 'shortNameSuperPro field', required: false })
    shortNameSuperPro: string;

    @ApiProperty({ description: 'nameSuperPro field', required: false })
    nameSuperPro: string;

    @ApiProperty({ description: 'shortName field', required: false })
    shortName: string;

    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'level1Id field', required: false })
    level1Id: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
