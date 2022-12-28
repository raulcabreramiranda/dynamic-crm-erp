import { IAdminPermission } from '../../permissions/_base/admin-permission-model';
import { IAdminUser } from '../../users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

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
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminPermissionUser> = {
    id: 0,
};

export default () => <div />;
