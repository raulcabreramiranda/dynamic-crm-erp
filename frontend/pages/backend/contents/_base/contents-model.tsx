import { ISubContents } from '../../../backend/subconteudo/_base/sub-contents-model';
import { IDiscipline } from '../../../backend/discipline/_base/discipline-model';
import { ICerneDegree } from '../../../backend/degree/_base/cerne-degree-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IContents {
    id?: number;
    code?: string;
    name?: string;
    subContents?: ISubContents[];
    discipline?: IDiscipline;
    series?: ICerneDegree;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IContents> = {
    id: 0,
};

export default () => <div />;
