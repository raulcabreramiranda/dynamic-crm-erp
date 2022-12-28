import { IJorneyGalery } from '../../jorneygalery/_base/jorney-galery-model';
import { IJorneyGalerySectionSubject } from '../../jorneyGalerySectionSubject/_base/jorney-galery-section-subject-model';
import { JorneyGalerySectionType } from '../../../../components/enumerations/jorney-galery-section-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorneyGalerySection {
    id?: number;
    name?: string;
    linkContentType?: string;
    linkBase64?: string;
    linkFileName?: string;
    link?: any;
    text?: any;
    textOrigin?: any;
    isActive?: boolean;
    canEdit?: boolean;
    jorneyGalerySectionType?: JorneyGalerySectionType;
    jorneyGalery?: IJorneyGalery;
    jorneyGalerySectionSubjects?: IJorneyGalerySectionSubject[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorneyGalerySection> = {
    id: 0,
};

export default () => <div />;
