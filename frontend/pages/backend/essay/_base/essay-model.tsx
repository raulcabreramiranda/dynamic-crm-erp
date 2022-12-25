import { IEssayPreUpload } from '../../../backend/essayPreUpload/_base/essay-pre-upload-model';
import { ICerneClass } from '../../../backend/class/_base/cerne-class-model';
import { IJorneyDegree } from '../../../backend/jorneydegree/_base/jorney-degree-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IMatrix } from '../../../backend/matrix/_base/matrix-model';
import { IConfigureApplication } from '../../../backend/configureapplication/_base/configure-application-model';
import { IConfigureCorrection } from '../../../backend/configurecorrection/_base/configure-correction-model';
import { IEssayResult } from '../../../backend/essayresult/_base/essay-result-model';
import { IEssayExternalReview } from '../../../backend/essayexternalreview/_base/essay-external-review-model';
import { EssayType } from '../../../../components/enumerations/essay-type.model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IEssay {
    id?: number;
    qtconsultationsExternal?: number;
    active?: boolean;
    startTime?: string;
    endTime?: string;
    reviewStartTime?: string;
    reviewEndTime?: string;
    essayType?: EssayType;
    typedText?: any;
    typedImageContentType?: string;
    typedImageBase64?: string;
    typedImageFileName?: string;
    typedImage?: any;
    reviewComment?: any;
    reOpenEndTime?: string;
    lastClientDataDevice?: string;
    allowReUploadImage?: boolean;
    commentsList?: any;
    essayPreUpload?: IEssayPreUpload;
    cerneClass?: ICerneClass;
    jorneyDegree?: IJorneyDegree;
    user?: IAdminUser;
    matrix?: IMatrix;
    configureApplication?: IConfigureApplication;
    configureCorrection?: IConfigureCorrection;
    essayResults?: IEssayResult[];
    reviewUser?: IAdminUser;
    essayExternalReviews?: IEssayExternalReview[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IEssay> = {
    id: 0,
};

export default () => <div />;
