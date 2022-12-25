import { ITheme } from '../../../backend/theme/_base/theme-model';
import { ICerneClass } from '../../../backend/class/_base/cerne-class-model';
import { IEssay } from '../../../backend/essay/_base/essay-model';
import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IConfigureApplication {
    id?: number;
    dateInitial?: string;
    dateFinal?: string;
    applicationPresential?: boolean;
    applicationOnline?: boolean;
    productionText?: boolean;
    productionPhoto?: boolean;
    prewiewCorrection?: boolean;
    previewLimitRewrite?: number;
    limitTime?: number;
    theme?: ITheme;
    cerneClass?: ICerneClass;
    essays?: IEssay[];
    jorneyDegree?: IJorneyDegree;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IConfigureApplication> = {
    id: 0,
};

export default () => <div />;
