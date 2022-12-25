import { IEssayPreUpload } from '../../../backend/essayPreUpload/_base/essay-pre-upload-model';
import { IJorneyGalery } from '../../../backend/jorneygalery/_base/jorney-galery-model';
import { IEssay } from '../../../backend/essay/_base/essay-model';
import { IJorney } from '../../../backend/jorney/_base/jorney-model';
import { ICerneDegree } from '../../../backend/degree/_base/cerne-degree-model';
import { IJorneyDegreesThemes } from '../../../backend/jorneyDegreesThemes/_base/jorney-degrees-themes-model';
import { IConfigureApplication } from '../../../backend/configureapplication/_base/configure-application-model';
import { IConfigureCorrection } from '../../../backend/configurecorrection/_base/configure-correction-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IJorneyDegree {
    id?: number;
    active?: boolean;
    year?: number;
    essayPreUploads?: IEssayPreUpload[];
    jorneyGalerys?: IJorneyGalery[];
    essays?: IEssay[];
    jorney?: IJorney;
    cerneDegree?: ICerneDegree;
    jorneyDegreesThemes?: IJorneyDegreesThemes[];
    configureApplications?: IConfigureApplication[];
    configureCorrection?: IConfigureCorrection[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IJorneyDegree> = {
    id: 0,
};

export default () => <div />;
