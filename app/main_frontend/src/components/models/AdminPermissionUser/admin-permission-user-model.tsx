import { IAdminPermission, IAdminPermissionFilter } from 'src/components/models/AdminPermission/admin-permission-model';
import { IAdminUser, IAdminUserFilter } from 'src/components/models/AdminUser/admin-user-model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminPermissionUser = 'admin-permission-users';
export interface IAdminPermissionUser {
    id?: number;
    view?: boolean;
    resgister?: boolean;
    edit?: boolean;
    deleteRow?: boolean;
    report?: boolean;
    adminPermission?: IAdminPermission[];
    adminUser?: IAdminUser[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionUserFilter {
    id?: IFilter<number>;
    view?: IFilter<boolean>;
    resgister?: IFilter<boolean>;
    edit?: IFilter<boolean>;
    deleteRow?: IFilter<boolean>;
    report?: IFilter<boolean>;
    adminPermission?: IAdminPermissionFilter[];
    adminUser?: IAdminUserFilter[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionUserFilters extends IAdminPermissionUserFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminPermissionUser> = {
    id: 0,
};

export default () => <div />;
