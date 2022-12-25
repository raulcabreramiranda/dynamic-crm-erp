import { IExamCardRead } from '../../../backend/leiturascartoesprova/_base/exam-card-read-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IExamCard {
    id?: number;
    name?: string;
    active?: boolean;
    templateGeneration?: any;
    templateReading?: any;
    templateBlank?: any;
    phpCustom?: any;
    phpCustomReading?: any;
    examCardRead?: IExamCardRead[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IExamCard> = {
    id: 0,
};

export default () => <div />;
