import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminUserSuperPro {
    id?: number;
    email?: string;
    emailSuperPro?: string;
    passwordSuperPro?: string;
    theacher?: IAdminUser;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminUserSuperPro> = {
    id: 0,
};

export default () => <div />;
