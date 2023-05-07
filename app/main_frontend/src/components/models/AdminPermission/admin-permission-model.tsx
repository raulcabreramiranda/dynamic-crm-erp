import { IAdminPermissionProfile, IAdminPermissionProfileFilter } from 'src/components/models/AdminPermissionProfile/admin-permission-profile-model';
import { IAdminPermissionUser, IAdminPermissionUserFilter } from 'src/components/models/AdminPermissionUser/admin-permission-user-model';
import { AdminPermissionSession } from 'src/components/enumerations/admin-permission-session.model';
import { AdminPermissionMethod } from 'src/components/enumerations/admin-permission-method.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminPermission = 'admin-permissions';
export interface IAdminPermission {
    id?: number;
    name?: string;
    session?: AdminPermissionSession;
    method?: AdminPermissionMethod;
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
    session?: IFilter<AdminPermissionSession>;
    method?: IFilter<AdminPermissionMethod>;
    adminPermissionProfiles?: IAdminPermissionProfileFilter[];
    adminPermissionUsers?: IAdminPermissionUserFilter[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminPermissionFilters extends IAdminPermissionFilter {
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
