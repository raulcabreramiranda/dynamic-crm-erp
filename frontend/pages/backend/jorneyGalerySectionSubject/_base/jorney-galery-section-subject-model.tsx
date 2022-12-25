import { IJorneyGalerySection } from '../../../backend/jorneygalerysection/_base/jorney-galery-section-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorneyGalerySectionSubject {
    id?: number;
    name?: string;
    contents?: any;
    imageContentType?: string;
    imageBase64?: string;
    imageFileName?: string;
    image?: any;
    jorneyGalerySections?: IJorneyGalerySection;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorneyGalerySectionSubject> = {
    id: 0,
};

export default () => <div />;
