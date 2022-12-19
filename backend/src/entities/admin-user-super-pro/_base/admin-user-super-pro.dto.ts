/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A AdminUserSuperPro DTO object.
 */
export class AdminUserSuperProDTO extends BaseDTO {
    @ApiProperty({ description: 'email field', required: false })
    email: string;

    @ApiProperty({ description: 'emailSuperPro field', required: false })
    emailSuperPro: string;

    @ApiProperty({ description: 'passwordSuperPro field', required: false })
    passwordSuperPro: string;

    @ApiProperty({ type: AdminUserDTO, description: 'theacher relationship' })
    theacher: AdminUserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
