import { IAdminPermissionProfile, IAdminPermissionProfileFilter } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminUser, IAdminUserFilter } from '../../../admin/users/_base/admin-user-model';
import { Dayjs } from 'dayjs';
import { IFilter } from '../../../../components/util/entity-utils';

export const ApiPathAdminProfile = 'admin-profiles';
export interface IAdminProfile {
    id?: number;
    name?: string;
    status?: number;
    adminPermissionProfiles?: IAdminPermissionProfile[];
    adminUsers?: IAdminUser[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminProfileFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;
    status?: IFilter<number>;
    adminPermissionProfiles?: IAdminPermissionProfileFilter[];
    adminUsers?: IAdminUserFilter[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminProfileFilters extends IAdminProfile {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminProfile> = {
    id: 0,
};

export default () => <div />;
