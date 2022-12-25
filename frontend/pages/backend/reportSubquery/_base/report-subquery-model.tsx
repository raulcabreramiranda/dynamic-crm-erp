import { IReportByQuery } from '../../../backend/reportByQuery/_base/report-by-query-model';
import { IReportQueryTemplate } from '../../../backend/reportQueryTemplate/_base/report-query-template-model';
import { IReportCategory } from '../../../backend/reportCategory/_base/report-category-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IReportSubquery {
    id?: number;
    queryDescription?: string;
    title?: string;
    reportByQuery?: IReportByQuery;
    reportQueryTemplate?: IReportQueryTemplate[];
    reportCategory?: IReportCategory;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IReportSubquery> = {
    id: 0,
};

export default () => <div />;
