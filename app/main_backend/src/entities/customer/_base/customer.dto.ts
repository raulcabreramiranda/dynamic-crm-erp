/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { CustomerPersonType } from '../../../entities/customer/_base/customer-person-type.enum';

/**
 * A Customer DTO object.
 */
export class CustomerDTO extends BaseDTO {
    @ApiProperty({ description: 'commercialName field', required: false })
    commercialName: string;

    @ApiProperty({ description: 'corporateName field', required: false })
    corporateName: string;

    @ApiProperty({ enum: CustomerPersonType, description: 'personType enum field', required: false })
    personType: CustomerPersonType;

    @ApiProperty({ description: 'cnpj field', required: false })
    cnpj: string;

    @ApiProperty({ description: 'cpf field', required: false })
    cpf: string;

    @ApiProperty({ description: 'address field', required: false })
    address: string;

    @ApiProperty({ description: 'telephone field', required: false })
    telephone: string;

    @ApiProperty({ description: 'email field', required: false })
    email: string;

    @ApiProperty({ description: 'technicalManagerName field', required: false })
    technicalManagerName: string;

    @ApiProperty({ description: 'technicalManagerSector field', required: false })
    technicalManagerSector: string;

    @ApiProperty({ description: 'technicalManagerFunction field', required: false })
    technicalManagerFunction: string;

    @ApiProperty({ description: 'technicalManagerContact field', required: false })
    technicalManagerContact: string;

    @ApiProperty({ description: 'technicalManagerEmail field', required: false })
    technicalManagerEmail: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
