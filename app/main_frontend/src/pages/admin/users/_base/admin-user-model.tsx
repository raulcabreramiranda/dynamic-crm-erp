import { IAdminProfile } from '../../../admin/profiles/_base/admin-profile-model';
import { IAdminPermissionUser } from '../../../admin/permission-users/_base/admin-permission-user-model';
import { IAdminWhiteLabel } from '../../../admin/white-labels/_base/admin-white-label-model';
import { UserType } from '../../../../components/enumerations/user-type.model';
import { Dayjs } from 'dayjs';

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
    userType?: UserType;
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

export const defaultValue: Readonly<IAdminUser> = {
    id: 0,
};

export default () => <div />;
