import { IAdminPermissionProfile, IAdminPermissionProfileFilter } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminPermissionUser, IAdminPermissionUserFilter } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { Dayjs } from 'dayjs';
import { IFilter } from '../../../../components/util/entity-utils';

export const ApiPathAdminPermission = 'admin-permissions';
export interface IAdminPermission {
    id?: number;
    name?: string;
    slug?: string;
    view?: boolean;
    resgister?: boolean;
    edit?: boolean;
    deleteRow?: boolean;
    report?: boolean;
    adminPermissionProfiles?: IAdminPermissionProfile[];
    adminPermissionUsers?: IAdminPermissionUser[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;
    slug?: IFilter<string>;
    view?: IFilter<boolean>;
    resgister?: IFilter<boolean>;
    edit?: IFilter<boolean>;
    deleteRow?: IFilter<boolean>;
    report?: IFilter<boolean>;
    adminPermissionProfiles?: IAdminPermissionProfileFilter[];
    adminPermissionUsers?: IAdminPermissionUserFilter[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionFilters extends IAdminPermission {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminPermission> = {
    id: 0,
};

export default () => <div />;
