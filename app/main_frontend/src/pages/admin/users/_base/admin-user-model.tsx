import { IAdminProfile, IAdminProfileFilter } from '../../../admin/profiles/_base/admin-profile-model';
import { IAdminPermissionUser, IAdminPermissionUserFilter } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { IAdminWhiteLabel, IAdminWhiteLabelFilter } from '../../../admin/white-labels/_base/admin-white-label-model';
import { AdminUserUserType } from '../../../../components/enumerations/admin-user-user-type.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminUser = 'admin-users';
export interface IAdminUser {
    id?: number;
    login?: string;
    fullname?: string;
    cellphone?: string;
    phone?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    password?: string;
    imageUrlContentType?: string;
    imageUrlBase64?: string;
    imageUrlFileName?: string;
    imageUrl?: any;
    resetDate?: string;
    re?: string;
    ra?: string;
    userType?: AdminUserUserType;
    clientId?: number;
    adminProfile?: IAdminProfile;
    adminPermissionUsers?: IAdminPermissionUser[];
    adminWhiteLabel?: IAdminWhiteLabel;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminUserFilter {
    id?: IFilter<number>;
    login?: IFilter<string>;
    fullname?: IFilter<string>;
    cellphone?: IFilter<string>;
    phone?: IFilter<string>;
    email?: IFilter<string>;
    activated?: IFilter<boolean>;
    langKey?: IFilter<string>;
    password?: IFilter<string>;
    imageUrlContentType?: string;
    imageUrlBase64?: string;
    imageUrlFileName?: string;
    imageUrl?: IFilter<any>;
    resetDate?: IFilter<string>;
    re?: IFilter<string>;
    ra?: IFilter<string>;
    userType?: IFilter<AdminUserUserType>;
    clientId?: IFilter<number>;
    adminProfile?: IAdminProfileFilter;
    adminPermissionUsers?: IAdminPermissionUserFilter[];
    adminWhiteLabel?: IAdminWhiteLabelFilter;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminUserFilters extends IAdminUser {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminUser> = {
    id: 0,
};

export default () => <div />;
