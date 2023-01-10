/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminPermissionProfileDTO } from '../../admin-permission-profile/_base/admin-permission-profile.dto';
import { AdminPermissionUserDTO } from '../../admin-permission-user/_base/admin-permission-user.dto';

/**
 * A AdminPermission DTO object.
 */
export class AdminPermissionDTO extends BaseDTO {
    @ApiProperty({ description: 'name field', required: false })
    name: string;

    @ApiProperty({ description: 'slug field', required: false })
    slug: string;

    @ApiProperty({ description: 'view field', required: false })
    view: boolean;

    @ApiProperty({ description: 'resgister field', required: false })
    resgister: boolean;

    @ApiProperty({ description: 'edit field', required: false })
    edit: boolean;

    @ApiProperty({ description: 'deleteRow field', required: false })
    deleteRow: boolean;

    @ApiProperty({ description: 'report field', required: false })
    report: boolean;

    @ApiProperty({ type: AdminPermissionProfileDTO, isArray: true, description: 'adminPermissionProfiles relationship' })
    adminPermissionProfiles: AdminPermissionProfileDTO[];

    @ApiProperty({ type: AdminPermissionUserDTO, isArray: true, description: 'adminPermissionUsers relationship' })
    adminPermissionUsers: AdminPermissionUserDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
