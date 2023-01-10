import { IAdminPermission } from '../../../admin/permissions/_base/admin-permission-model';
import { IAdminProfile } from '../../../admin/profiles/_base/admin-profile-model';
import { Dayjs } from 'dayjs';

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
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IAdminPermissionProfile> = {
    id: 0,
};

export default () => <div />;
