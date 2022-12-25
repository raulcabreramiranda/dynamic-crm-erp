import { IContents } from '../../../backend/contents/_base/contents-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ISubContents {
    id?: number;
    name?: string;
    enemincidenceparameter?: number;
    enemIncidencePercent?: number;
    content?: IContents;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ISubContents> = {
    id: 0,
};

export default () => <div />;
