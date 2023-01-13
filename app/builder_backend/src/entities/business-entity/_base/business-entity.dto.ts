/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { BusinessEntityFieldDTO } from '../../business-entity-field/_base/business-entity-field.dto';

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

    @ApiProperty({ type: BusinessEntityFieldDTO, isArray: true, description: 'businessEntityField relationship' })
    businessEntityField: BusinessEntityFieldDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
