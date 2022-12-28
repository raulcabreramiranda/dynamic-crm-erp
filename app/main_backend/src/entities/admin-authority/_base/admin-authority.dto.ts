/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

/**
 * A AdminAuthority DTO object.
 */
export class AdminAuthorityDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
