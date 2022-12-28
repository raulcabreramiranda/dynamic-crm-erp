import { IEssayResult } from '../../essayresult/_base/essay-result-model';
import { IMatrix } from '../../matrix/_base/matrix-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IMatrixAnnulmentReason {
    id?: number;
    name?: string;
    comment?: string;
    idRed1000?: number;
    essayResult?: IEssayResult[];
    matrix?: IMatrix;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IMatrixAnnulmentReason> = {
    id: 0,
};

export default () => <div />;
