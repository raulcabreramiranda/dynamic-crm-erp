import { IAdminPermission } from '../../permissions/_base/admin-permission-model';
import { IAdminProfile } from '../../profiles/_base/admin-profile-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminPermissionProfile {
    id?: number;
    view?: boolean;
    resgister?: boolean;
    edit?: boolean;
    deleteRow?: boolean;
    report?: boolean;
    adminPermission?: IAdminPermission;
    adminProfile?: IAdminProfile;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminPermissionProfile> = {
    id: 0,
};

export default () => <div />;
