import { IEssay } from '../../../backend/essay/_base/essay-model';
import { Moment } from 'moment';
import IUser from '../../../../components/models/user.model';

export interface IEssayExternalReview {
    id?: number;
    externalId?: string;
    externalReviewId?: string;
    essayExternalSendData?: string;
    essayExternalCheckData?: string;
    essayExternalReplay?: any;
    status?: string;
    essay?: IEssay;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Moment;
    lastModifiedBy?: number;
    lastModifiedDate?: Moment;
    deletedAt?: Moment;
}

export const defaultValue: Readonly<IEssayExternalReview> = {
    id: 0,
};

export default () => <div />;
