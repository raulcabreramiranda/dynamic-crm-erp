import { IReportSubquery } from '../../../backend/reportSubquery/_base/report-subquery-model';
import { IReportByQuery } from '../../../backend/reportByQuery/_base/report-by-query-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IReportCategory {
    id?: number;
    icon?: string;
    title?: string;
    description?: string;
    platformId?: number;
    deletedBy?: string;
    reportSubquery?: IReportSubquery[];
    reportByQuery?: IReportByQuery[];

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IReportCategory> = {
    id: 0,
};

export default () => <div />;
