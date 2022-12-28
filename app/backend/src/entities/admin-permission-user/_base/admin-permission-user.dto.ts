/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from '../../../service/dto/base.dto';

import { AdminPermissionDTO } from '../../admin-permission/_base/admin-permission.dto';
import { AdminUserDTO } from '../../admin-user/_base/admin-user.dto';

/**
 * A AdminPermissionUser DTO object.
 */
export class AdminPermissionUserDTO extends BaseDTO {
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

    @ApiProperty({ type: AdminPermissionDTO, description: 'adminPermission relationship' })
    adminPermission: AdminPermissionDTO;

    @ApiProperty({ type: AdminUserDTO, description: 'adminUser relationship' })
    adminUser: AdminUserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
