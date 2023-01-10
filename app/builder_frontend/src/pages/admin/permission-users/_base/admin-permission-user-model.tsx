import { IAdminPermission } from '../../../admin/permissions/_base/admin-permission-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Dayjs } from 'dayjs';

export interface IAdminPermissionUser {
    id?: number;
    view?: boolean;
    resgister?: boolean;
    edit?: boolean;
    deleteRow?: boolean;
    report?: boolean;
    adminPermission?: IAdminPermission;
    adminUser?: IAdminUser;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminPermissionUser> = {
    id: 0,
};

export default () => <div />;
