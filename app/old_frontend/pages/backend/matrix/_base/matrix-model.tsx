import { IEssay } from '../../essay/_base/essay-model';
import { IMatrixAnnulmentReason } from '../../matrixAnnulmentReason/_base/matrix-annulment-reason-model';
import { ISkill } from '../../skill/_base/skill-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IMatrix {
    id?: number;
    name?: string;
    essays?: IEssay[];
    matrixAnnulmentReasons?: IMatrixAnnulmentReason[];
    skills?: ISkill[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IMatrix> = {
    id: 0,
};

export default () => <div />;
