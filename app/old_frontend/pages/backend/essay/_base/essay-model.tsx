import { IEssayPreUpload } from '../../essayPreUpload/_base/essay-pre-upload-model';
import { ICerneClass } from '../../class/_base/cerne-class-model';
import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { IAdminUser } from '../../../admin/users/_base/admin-user-model';
import { IMatrix } from '../../matrix/_base/matrix-model';
import { IConfigureApplication } from '../../configureapplication/_base/configure-application-model';
import { IConfigureCorrection } from '../../configurecorrection/_base/configure-correction-model';
import { IEssayResult } from '../../essayresult/_base/essay-result-model';
import { IEssayExternalReview } from '../../essayexternalreview/_base/essay-external-review-model';
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
