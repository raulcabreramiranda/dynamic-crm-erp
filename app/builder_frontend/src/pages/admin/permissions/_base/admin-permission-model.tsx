import { IAdminPermissionProfile } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminPermissionUser } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { Dayjs } from 'dayjs';

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

export const defaultValue: Readonly<IAdminPermission> = {
    id: 0,
};

export default () => <div />;
