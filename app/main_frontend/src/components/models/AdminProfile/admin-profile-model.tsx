import { IAdminPermissionProfile, IAdminPermissionProfileFilter } from 'src/components/models/AdminPermissionProfile/admin-permission-profile-model';
import { IAdminUser, IAdminUserFilter } from 'src/components/models/AdminUser/admin-user-model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

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

export interface IAdminProfileFilters extends IAdminProfileFilter {
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
