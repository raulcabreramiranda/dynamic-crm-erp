import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IAdminAuthority {
    id?: number;
    name?: string;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IAdminAuthority> = {
    id: 0,
};

export default () => <div />;
