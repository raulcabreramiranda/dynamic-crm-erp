import { IReportSubquery } from '../../../backend/reportSubquery/_base/report-subquery-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IReportQueryTemplate {
    id?: number;
    templateName?: string;
    groupBy?: string;
    dimension?: string;
    description?: string;
    isPublic?: boolean;
    reportSubquery?: IReportSubquery;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IReportQueryTemplate> = {
    id: 0,
};

export default () => <div />;
