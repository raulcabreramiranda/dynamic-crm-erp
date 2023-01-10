/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminPermissionProfileDTO } from '../../admin-permission-profile/_base/admin-permission-profile.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A AdminProfile DTO object.
 */
export class AdminProfileDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'status field', required: false })
    status: number;

    @ApiProperty({ type: AdminPermissionProfileDTO, isArray: true, description: 'adminPermissionProfiles relationship' })
    adminPermissionProfiles: AdminPermissionProfileDTO[];

    @ApiProperty({ type: AdminUserDTO, isArray: true, description: 'adminUsers relationship' })
    adminUsers: AdminUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
