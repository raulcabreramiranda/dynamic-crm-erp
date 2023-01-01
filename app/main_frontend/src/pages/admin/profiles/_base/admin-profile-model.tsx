import { IAdminPermissionProfile } from '../../../admin/permission-profiles/_base/admin-permission-profile-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Dayjs } from 'dayjs';

export interface IAdminProfile {
    id?: number;
    name?: string;
    status?: number;
    adminPermissionProfiles?: IAdminPermissionProfile[];
    adminUsers?: IAdminUser[];

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminProfile> = {
    id: 0,
};

export default () => <div />;
