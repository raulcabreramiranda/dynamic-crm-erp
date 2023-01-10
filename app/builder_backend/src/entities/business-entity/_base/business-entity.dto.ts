/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A BusinessEntity DTO object.
 */
export class BusinessEntityDTO extends BaseDTO {
    @ApiProperty({ description: 'entityName field', required: false })
    entityName: string;

    @ApiProperty({ description: 'entityNameHumanized field', required: false })
    entityNameHumanized: string;

    @ApiProperty({ description: 'entityNameHumanizedPlural field', required: false })
    entityNameHumanizedPlural: string;

    @ApiProperty({ description: 'frontPath field', required: false })
    frontPath: string;

    @ApiProperty({ description: 'hasWhiteLabel field', required: false })
    hasWhiteLabel: boolean;

    @ApiProperty({ description: 'hasDateAudit field', required: false })
    hasDateAudit: boolean;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
