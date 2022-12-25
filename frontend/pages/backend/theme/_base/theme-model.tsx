import { IEssayPreUpload } from '../../../backend/essayPreUpload/_base/essay-pre-upload-model';
import { IConfigureApplication } from '../../../backend/configureapplication/_base/configure-application-model';
import { IConfigureCorrection } from '../../../backend/configurecorrection/_base/configure-correction-model';
import { IJorneyDegreesThemes } from '../../../backend/jorneyDegreesThemes/_base/jorney-degrees-themes-model';
import { ICerneDegree } from '../../../backend/degree/_base/cerne-degree-model';
import { IJorney } from '../../../backend/jorney/_base/jorney-model';
import { IThemePdf } from '../../../backend/theme-pdf/_base/theme-pdf-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface ITheme {
    id?: number;
    name?: string;
    proposalText?: any;
    proposalImagemContentType?: string;
    proposalImagemBase64?: string;
    proposalImagemFileName?: string;
    proposalImagem?: any;
    order?: number;
    active?: boolean;
    externalIntegrationId?: string;
    proposalVideo?: string;
    jorneyDegrees_jorney_name?: any;
    jorneyDegrees_theme_name?: any;
    jorneyDegrees_cerneDegree_name?: any;
    remake?: boolean;
    startDate?: string;
    endDate?: string;
    essayPreUploads?: IEssayPreUpload[];
    configureApplications?: IConfigureApplication[];
    configureCorrections?: IConfigureCorrection[];
    jorneyDegreesThemes?: IJorneyDegreesThemes[];
    cerneDegree?: ICerneDegree;
    jorney?: IJorney;
    themePdf?: IThemePdf[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<ITheme> = {
    id: 0,
};

export default () => <div />;
