/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A AdminWhiteLabel DTO object.
 */
export class AdminWhiteLabelDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'logo field', required: false })
    logo: string;

    @ApiProperty({ description: 'socialReason field', required: false })
    socialReason: string;

    @ApiProperty({ description: 'fantasyName field', required: false })
    fantasyName: string;

    @ApiProperty({ description: 'cnpj field', required: false })
    cnpj: string;

    @ApiProperty({ description: 'zipCode field', required: false })
    zipCode: string;

    @ApiProperty({ description: 'street field', required: false })
    street: string;

    @ApiProperty({ description: 'complement field', required: false })
    complement: string;

    @ApiProperty({ description: 'number field', required: false })
    number: string;

    @ApiProperty({ description: 'neighborhood field', required: false })
    neighborhood: string;

    @ApiProperty({ description: 'city field', required: false })
    city: string;

    @ApiProperty({ description: 'uf field', required: false })
    uf: string;

    @ApiProperty({ type: AdminUserDTO, isArray: true, description: 'adminUsers relationship' })
    adminUsers: AdminUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
