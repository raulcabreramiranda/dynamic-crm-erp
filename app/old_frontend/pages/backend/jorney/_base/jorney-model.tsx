import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { ITheme } from '../../theme/_base/theme-model';
import { JorneyType } from '../../../../components/enumerations/jorney-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorney {
    id?: number;
    year?: number;
    name?: string;
    jorneyType?: JorneyType;
    jorneyDegrees_cerneDegree_name?: any;
    imageBannerContentType?: string;
    imageBannerBase64?: string;
    imageBannerFileName?: string;
    imageBanner?: any;
    clientId?: number;
    jorneyDegrees?: IJorneyDegree[];
    themes?: ITheme[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorney> = {
    id: 0,
};

export default () => <div />;
