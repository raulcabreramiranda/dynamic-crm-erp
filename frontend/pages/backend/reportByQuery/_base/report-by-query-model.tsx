import { IReportSubquery } from '../../../backend/reportSubquery/_base/report-subquery-model';
import { IReportCategory } from '../../../backend/reportCategory/_base/report-category-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IReportByQuery {
    id?: number;
    title?: string;
    queryDescription?: string;
    public?: boolean;
    icon?: string;
    status?: string;
    reportSubquery?: IReportSubquery[];
    reportCategory?: IReportCategory;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IReportByQuery> = {
    id: 0,
};

export default () => <div />;
