import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { ITheme } from '../../../backend/theme/_base/theme-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorneyDegreesThemes {
    id?: number;
    startDate?: string;
    endDate?: string;
    jorneyDegree?: IJorneyDegree;
    theme?: ITheme;

    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorneyDegreesThemes> = {
    id: 0,
};

export default () => <div />;
