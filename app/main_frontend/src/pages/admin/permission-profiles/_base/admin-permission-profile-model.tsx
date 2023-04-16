import { IAdminPermission, IAdminPermissionFilter } from '../../../admin/permissions/_base/admin-permission-model';
import { IAdminProfile, IAdminProfileFilter } from '../../../admin/profiles/_base/admin-profile-model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminPermissionProfile = 'admin-permission-profiles';
export interface IAdminPermissionProfile {
    id?: number;
    adminPermission?: IAdminPermission;
    adminProfile?: IAdminProfile;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionProfileFilter {
    id?: IFilter<number>;
    adminPermission?: IAdminPermissionFilter;
    adminProfile?: IAdminProfileFilter;
}

export interface IAdminPermissionProfileFilters extends IAdminPermissionProfile {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminPermissionProfile> = {
    id: 0,
};

export default () => <div />;
