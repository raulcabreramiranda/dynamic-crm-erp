/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A Professional DTO object.
 */
export class ProfessionalDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'birthDate field', required: false })
    birthDate: Date;

    @ApiProperty({ description: 'cpf field', required: false })
    cpf: string;

    @ApiProperty({ description: 'rg field', required: false })
    rg: string;

    @ApiProperty({ description: 'telephone field', required: false })
    telephone: string;

    @ApiProperty({ description: 'email field', required: false })
    email: string;

    @ApiProperty({ description: 'contract field', required: false })
    contract: string;

    @ApiProperty({ description: 'startDate field', required: false })
    startDate: Date;

    @ApiProperty({ description: 'endDate field', required: false })
    endDate: Date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
