/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminPermissionDTO } from '../../admin-permission/_base/admin-permission.dto';
import { AdminProfileDTO } from '../../admin-profile/_base/admin-profile.dto';

/**
 * A AdminPermissionProfile DTO object.
 */
export class AdminPermissionProfileDTO extends BaseDTO {
    @ApiProperty({ type: AdminPermissionDTO, description: 'adminPermission relationship' })
    adminPermission: AdminPermissionDTO;

    @ApiProperty({ type: AdminProfileDTO, description: 'adminProfile relationship' })
    adminProfile: AdminProfileDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
