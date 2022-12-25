import { IEssayResult } from '../../../backend/essayresult/_base/essay-result-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IEssayResultComment {
    id?: number;
    name?: string;
    essayResult?: IEssayResult;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IEssayResultComment> = {
    id: 0,
};

export default () => <div />;
