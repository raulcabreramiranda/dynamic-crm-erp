import { IAdminPermissionProfile } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminProfile {
    id?: number;
    name?: string;
    status?: number;
    adminPermissionProfiles?: IAdminPermissionProfile[];
    adminUsers?: IAdminUser[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminProfile> = {
    id: 0,
};

export default () => <div />;
