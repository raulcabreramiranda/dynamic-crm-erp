import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { IJorneyGalerySection } from '../../../backend/jorneygalerysection/_base/jorney-galery-section-model';
import { JorneyGaleryType } from '../../../../components/enumerations/jorney-galery-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorneyGalery {
    id?: number;
    name?: string;
    canEdit?: boolean;
    isInsideSubject?: boolean;
    jorneyDegrees_jorney_name?: any;
    orneyDegrees_theme_name?: any;
    orneyDegrees_cerneDegree_name?: any;
    jorneyGaleryType?: JorneyGaleryType;
    jorneyDegrees?: IJorneyDegree;
    jorneyGalerySections?: IJorneyGalerySection[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorneyGalery> = {
    id: 0,
};

export default () => <div />;
