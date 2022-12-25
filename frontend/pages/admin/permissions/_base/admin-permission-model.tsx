import { IAdminPermissionProfile } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminPermissionUser } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

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
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminPermission> = {
    id: 0,
};

export default () => <div />;
