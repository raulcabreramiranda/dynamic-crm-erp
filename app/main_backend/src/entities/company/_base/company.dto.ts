/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A Company DTO object.
 */
export class CompanyDTO extends BaseDTO {
    @ApiProperty({ description: 'commercialNameTeste833 field', required: false })
    commercialNameTeste833: string;

    @ApiProperty({ description: 'commercialName field', required: false })
    commercialName: string;

    @ApiProperty({ description: 'corporateName field', required: false })
    corporateName: string;

    @ApiProperty({ description: 'cnpj field', required: false })
    cnpj: string;

    @ApiProperty({ description: 'telephone field', required: false })
    telephone: string;

    @ApiProperty({ description: 'email field', required: false })
    email: string;

    @ApiProperty({ description: 'address field', required: false })
    address: string;

    @ApiProperty({ description: 'cnae field', required: false })
    cnae: string;

    @ApiProperty({ description: 'technicalManagerName field', required: false })
    technicalManagerName: string;

    @ApiProperty({ description: 'technicalManagerCategory field', required: false })
    technicalManagerCategory: string;

    @ApiProperty({ description: 'technicalManagerBoardNumber field', required: false })
    technicalManagerBoardNumber: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
