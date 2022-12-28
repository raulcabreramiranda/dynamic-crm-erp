import { IExamsMaster } from '../../provasmaster/_base/exams-master-model';
import { Type } from '../../../../components/enumerations/type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IMaster {
    id?: number;
    name?: string;
    type?: Type;
    examsMaster?: IExamsMaster[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IMaster> = {
    id: 0,
};

export default () => <div />;
