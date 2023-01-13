/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { BusinessEntityFieldFieldType } from '../../../entities/business-entity-field/_base/business-entity-field-field-type.enum';

/**
 * A BusinessEntityField DTO object.
 */
export class BusinessEntityFieldDTO extends BaseDTO {
    @ApiProperty({ description: 'fieldName field', required: false })
    fieldName: string;

    @ApiProperty({ description: 'fieldNameHumanized field', required: false })
    fieldNameHumanized: string;

    @ApiProperty({ enum: BusinessEntityFieldFieldType, description: 'fieldType enum field', required: false })
    fieldType: BusinessEntityFieldFieldType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
