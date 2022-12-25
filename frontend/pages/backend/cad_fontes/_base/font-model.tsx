import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IFont {
    id?: number;
    name?: string;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IFont> = {
    id: 0,
};

export default () => <div />;
