import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { ITheme } from '../../../backend/theme/_base/theme-model';
import { JorneyType } from '../../../../components/enumerations/jorney-type.model';
import { Dayjs } from 'dayjs';
import IUser from '../../../../components/models/user.model';

export interface IJorney {
    id?: number;
    year?: string;
    name?: string;
    jorneyType?: JorneyType;
    imageBannerContentType?: string;
    imageBannerBase64?: string;
    imageBannerFileName?: string;
    imageBanner?: any;
    clientId?: number;
    jorneyDegrees?: IJorneyDegree[];
    themes?: ITheme[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export const defaultValue: Readonly<IJorney> = {
    id: 0,
};

export default () => <div />;
